import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Wangeditor from 'wangeditor';
import fileMenu from './fileMenu';
// import $axios from '@/request';

/**
 * 对wangEditor进行封装后的富文本编辑器组件，引用该组件时可传入一下参数
 *    isUploadFile： 是否可上传附件（自定义扩展菜单）
 *    defaultHtml： 默认初始化内容
 *    height： 设置编辑器高度
 *    uploadFileServer：附件上传接口地址
 *    maxFileSize：上传附件大小最大限制（单位：M）
 *    uploadImgServer：图片上传接口地址
 *    maxImgSize：上传图片大小最大限制（单位：M）
 *    menus: 可显示的菜单项
 */
export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef();
    this.state = {
      isUploading: false, //是否正在上传附件或图片
    }
  }

  componentDidMount = () => {
    const div = this.containerRef.current;
    const editor = new Wangeditor(div);
    editor.config.height = this.props?.height || 200;
    editor.config.menus = this.props?.menus || [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'lineHeight', // 行高
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      // 'video', // 插入视频
      // 'code', // 插入代码
      // 'undo', // 撤销
      // 'redo' // 重复
    ];

    this.editor = editor;
    this.setCustomConfig();
    editor.create();
    editor.txt.html(this?.props?.defaultHtml)
    // 要放在editor实例化之后创建上传菜单
    this?.props?.isUploadFile &&
      fileMenu(
        editor,
        this.containerRef.current,
        {
          uploadFileServer: this.props?.uploadFileServer, // 附件上传接口地址
          maxFileSize: this.props?.maxFileSize || 10,  // 限制附件最大尺寸（单位：M）
        },
        this.changeUploading
      );
  };


  changeUploading = (flag) => {
    this.setState({ isUploading: flag });
  }

  onChange = html => {
    this?.props?.onChange(html);
  };

  // 上传图片
  setCustomConfig = () => {
    const _this = this;
    const { customConfig } = this.props
    this.editor.customConfig = {
      // 关闭粘贴内容中的样式
      pasteFilterStyle: false,
      // 忽略粘贴内容中的图片
      pasteIgnoreImg: true,
      ...customConfig,
    }

    const uploadImgServer = this.props?.uploadImgServer; // 上传图片的地址
    const maxLength = 1; // 限制每次最多上传图片的个数
    const maxImgSize = 2; // 上传图片的最大大小（单位：M）
    const timeout = 1 * 60 * 1000 // 超时 1min
    let resultFiles = [];

    // this.editor.config.uploadImgMaxSize = maxImgSize * 1024 * 1024; // 上传图片大小2M
    this.editor.config.uploadImgMaxLength = maxLength; // 限制一次最多上传 1 张图片
    this.editor.config.customUploadImg = function (files, insert) { //上传图片demo
      _this.changeUploading(true);
      for (let file of files) {
        const name = file.name
        const size = file.size
        // chrome 低版本 name === undefined
        if (!name || !size) {
          _this.changeUploading(false);
          return;
        }
        if (maxImgSize * 1024 * 1024 < size) {
          // 上传附件过大
          message.warning('上传附件不可超过' + maxImgSize + 'M');
          _this.changeUploading(false);
          return;
        }
        // 验证通过的加入结果列表
        resultFiles.push(file);
      }
      console.log(resultFiles)
      if (resultFiles.length > maxLength) {
        message.warning('一次最多上传' + maxLength + '个文件');
        _this.changeUploading(false);
        return;
      }

      // files 是 input 中选中的文件列表
      const formData = new window.FormData();
      formData.append('file', files[0]);

      if (uploadImgServer && typeof uploadImgServer === 'string') {
        // 定义 xhr
        const xhr = new XMLHttpRequest()
        xhr.open('POST', uploadImgServer)
        // 设置超时
        xhr.timeout = timeout
        xhr.ontimeout = function () {
          message.error('上传图片超时')
        }
        // 监控 progress
        if (xhr.upload) {
          xhr.upload.onprogress = function (e) {
            let percent = void 0
            // 进度条
            if (e.lengthComputable) {
              percent = e.loaded / e.total
              console.log('上传进度：', percent);
            }
          }
        }
        // 返回数据
        xhr.onreadystatechange = function () {
          let result = void 0
          if (xhr.readyState === 4) {
            if (xhr.status < 200 || xhr.status >= 300) {
              message.error('上传失败');
              _this.changeUploading(false);
              resultFiles = [];
              return;
            }
            result = xhr.responseText
            if ((typeof result === 'undefined' ? 'undefined' : typeof result) !== 'object') {
              try {
                result = JSON.parse(result)
              } catch (ex) {
                message.error('上传失败');
                _this.changeUploading(false);
                resultFiles = [];
                return;
              }
            }
            const res = result || []
            if (res?.code == 200) {
              // 上传代码返回结果之后，将图片插入到编辑器中
              insert(res?.data?.url || '');
              _this.changeUploading(false);
              resultFiles = [];
            }
          }
        }
        // 自定义 headers
        xhr.setRequestHeader('token', sessionStorage.getItem('token'));

        // 跨域传 cookie
        xhr.withCredentials = false
        // 发送请求
        xhr.send(formData);
      }
    };
  };
  render() {
    return (
      <Spin spinning={this.state.isUploading} tip={"上传中……"}>
        <div ref={this.containerRef} />
      </Spin>
    );
  }
}