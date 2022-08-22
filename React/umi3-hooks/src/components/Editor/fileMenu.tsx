import fileImg from '@/assets/images/fujian.png';
import { uploadFile } from '@/services/file';
import { message } from 'antd';
import BMF from 'browser-md5-file';

/**
 * 扩展 上传附件的功能
  editor: wangEdit的实例
  editorSelector: wangEdit挂载点的节点
  options: 一些配置
*/
export default (editor: any, editorSelector: any, options: any, changeUploading: any) => {
  editor.fileMenu = {
    init: function (wangEditor: any, wangEditorSelector: any) {
      const div = document.createElement('div');
      div.className = 'w-e-menu';
      div.style.position = 'relative';
      div.setAttribute('data-title', '附件');
      const rdn = new Date().getTime();
      div.onclick = function () {
        const enclosureDiv = document.getElementById(`up-${rdn}`);
        if (enclosureDiv) {
          enclosureDiv.click();
        }
      };

      const input: any = document.createElement('input');
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
      wangEditorSelector.getElementsByClassName('w-e-toolbar')[0].append(div);

      input.onchange = (e: any) => {
        changeUploading(true);
        const bmf = new BMF();
        console.log(e.target.files);
        const file = e.target.files[0];
        bmf.md5(file, (err: any, md5: any) => {
          const formData = new FormData();
          formData.append('file_md5', md5);
          formData.append('file', file);
          formData.append('storage_type', options.storageType);
          uploadFile(formData)
            .then((res) => {
              changeUploading(false);
              if (res.error.code === 0) {
                // let aNode ='<p><a href=' +res.data.publicUrl +' download=' +file.name +'>' +file.name +'</a></p>';

                const aNode = `<p><a href=${res.data.publicUrl} download=${file.name} >${file.name}</a></p>`;

                wangEditor.txt.append(aNode);
              } else {
                message.error('上传失败');
              }
            })
            .catch(() => {
              changeUploading(false);
            });
        });
      };
    },
  };

  // 创建完之后立即实例化
  editor.fileMenu.init(editor, editorSelector);
};
