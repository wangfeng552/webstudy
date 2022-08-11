import uploadFile from './UploadFile';
/**
  editor: wangEdit的实例
  editorSelector: wangEdit挂载点的节点
  options: 一些配置
*/
export default (editor:any, editorSelector:any) => {
    editor.fileMenu = {
      init: function(editor:any, editorSelector:any) {
        const div:any = document.createElement('div')
        div.className = 'w-e-menu'
        div.style.zIndex = 10001
        const rdn:number = new Date().getTime()
        div.onclick = function() {
          document.getElementById(`up-${rdn}`).click()
        }
  
        const input = document.createElement('input')
        input.type = 'file'
        input.name = 'file'
        input.id = `up-${rdn}`
        input.className = 'upload-file-input'
  
        div.innerHTML = `<span class="upload-file-span">上传附件</span>`
        div.appendChild(input)
        editorSelector.getElementsByClassName('w-e-toolbar')[0].append(div)
        input.onchange = e => {
            // 使用uploadFile上传文件
            uploadFile(e.target.files, {
              onOk: data => {
                console.log(data)
                // 可以使用editor.txt.html(data)进行更新
              },
              onFail: err => {
                console.log(err)
              },
              onProgress: percent => {
                console.log(percent)
              },
            });
          }
      },
     
    }
  
    // 创建完之后立即实例化
    editor.fileMenu.init(editor, editorSelector)
  }