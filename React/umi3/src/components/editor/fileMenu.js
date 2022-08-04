import uploadFile from './uploadFile';
import fileImg from '@/assets/img/file.png';

/**
 * 扩展 上传附件的功能
  editor: wangEdit的实例
  editorSelector: wangEdit挂载点的节点
  options: 一些配置
*/
export default (editor, editorSelector, options, changeUploading) => {
  editor.fileMenu = {
    init: function (editor, editorSelector) {
      const div = document.createElement('div');
      div.className = 'w-e-menu';
      div.style.position = 'relative';
      div.setAttribute('data-title', '附件');
      const rdn = new Date().getTime();
      div.onclick = function () {
        document.getElementById(`up-${rdn}`).click();
      }

      const input = document.createElement('input');
      input.style.position = 'absolute';
      input.style.top = '0px';
      input.style.left = '0px';
      input.style.width = '40px';
      input.style.height = '40px';
      input.style.zIndex = 10;
      input.type = 'file';
      input.name = 'file';
      input.id = `up-${rdn}`;
      input.className = 'upload-file-input';

      div.innerHTML = `<span class="upload-file-span" style="position:absolute;top:0px;left:0px;width:40px;height:40px;z-index:20;background:#fff;"><img src=${fileImg} style="width:15px;margin-top:12px;" /></span>`;
      div.appendChild(input);
      editorSelector.getElementsByClassName('w-e-toolbar')[0].append(div);

      input.onchange = e => {
        changeUploading(true);
        // 使用uploadFile上传文件
        uploadFile(e.target.files, {
          uploadFileServer: options?.uploadFileServer, // 附件上传接口地址
          maxFileSize: options?.maxFileSize, //限制附件最大尺寸
          onOk: data => {
            let aNode = '<p><a href=' + data.url + ' download=' + data.name + '>' + data.name + '</a></p>';
            editor.txt.append(aNode);
            changeUploading(false);
            // editor.cmd.do(aNode, '<p>'+aNode+'</p>');
            // document.insertHTML(aNode)
          },
          onFail: err => {
            changeUploading(false);
            console.log(err);
          },
          // 上传进度，后期可添加上传进度条
          onProgress: percent => {
            console.log(percent);
          },
        });
      };
    },
  }

  // 创建完之后立即实例化
  editor.fileMenu.init(editor, editorSelector)
}