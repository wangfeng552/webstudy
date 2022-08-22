import editorUS from '@/locales/en-US/editor';
import editorCN from '@/locales/zh-CN/editor';
import { uploadFile } from '@/services/file';
import { message, Spin } from 'antd';
import BMF from 'browser-md5-file';
import i18next from 'i18next';
import type { FC} from 'react';
import { useEffect, useRef, useState } from 'react';
import { getLocale } from 'umi';
import E from 'wangeditor';
import fileMenu from './fileMenu';

interface EditorProps {
  storageType: string; // 文件类型
  value?: undefined;
  onChange?: (value: string) => void;
}
let editor: any = '';

const Editor: FC<EditorProps> = ({ value, storageType, onChange }) => {
  const editRef: any = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const bmf = new BMF();
    editor = new E(editRef.current);

    const locale = getLocale() || 'zh-CN';
    // const locale = 'zh-CN';
    editor.config.lang = locale;
    // 英文
    if (locale === 'en-US') {
      editor.config.languages.en = editorUS;
    }
    // 中文
    if (locale === 'zh-CN') {
      editor.config.languages['zh-CN'] = editorCN;
    }

    editor.i18next = i18next; // 引入 i18next 插件
    editor.config.zIndex = 10;
    editor.config.menus = [
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
      'code', // 插入代码
      'undo', // 撤销
      'redo', // 重复
    ];

    editor.config.onchange = function (newHtml: any) {
      if (onChange) {
        onChange(newHtml);
      }
      // 失去焦点把html传给父组件
    };

    editor.config.uploadImgServer = '/fsapi/file/_upload/v1';
    editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
    editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    editor.create();
    editor.txt.html(value);

    /**
     * 自定义上传图片
     * @param resultFiles  是 input 中选中的文件列表
     * @param insertImgFn  是获取图片 url 后，插入到编辑器的方法
     */
    editor.config.customUploadImg = function (resultFiles: any, insertImgFn: any) {
      setLoading(true);
      bmf.md5(resultFiles[0], (err: any, md5: any) => {
        const formData = new FormData();
        formData.append('file_md5', md5);
        formData.append('file', resultFiles[0]);
        formData.append('storage_type', storageType);
        uploadFile(formData)
          .then((res) => {
            setLoading(false);
            if (res.error.code === 0) {
              insertImgFn(res.data.publicUrl); // 上传图片，返回结果，将图片插入到编辑器中
            } else {
              message.error('上传失败');
            }
          })
          .catch(() => {
            setLoading(false);
          });
      });
    };
    // 要放在editor实例化之后创建上传附件
    fileMenu(editor, editRef.current, { storageType: storageType }, setLoading);
  }, []);

  useEffect(() => {
    if (value === null || value === '') {
      editor?.txt.clear(); // 清空富文本内容
    }
  }, [value]);

  return (
    <Spin spinning={loading}>
      <div ref={editRef} />
    </Spin>
  );
};

export default Editor;
