<template>
  <div class="edit-layout">
    <div class="search-top"></div>
    <div class="search-main">
      <div class="input-layout">
        <div class="fl">
          <input class="wf-input" v-model="license_number" type="text" placeholder="请输入车牌号" />
        </div>
        <div class="fr">
          <input type="file" class="meihua" ref="picfile" @change="getFile" />
          <i class="fa fa-camera"></i>
        </div>
      </div>
      <div class="search-btn" @click="goInfo">
        <div class="fa fa-edit"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLicenseNumberByImage } from "@/api/http";
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      license_number: "",

      picavalue: "",
      imgUrl: null,
      isEnlargeImage: false
    };
  },
  methods: {
    getFile2(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picavalue = files[0];
      console.log(this.picavalue);
      this.imgPreview(this.picavalue);
    },
    //获取图片
    imgPreview(file, callback) {
      let self = this;
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();

        //将图片转成base64格式
        reader.readAsDataURL(file);
        //读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          console.log("********未压缩前的图片大小********");

          console.log(result);
          console.log(result.length);
          img.onload = function() {
            let data = self.compress(img);
            self.imgUrl = result;

            let blob = self.dataURItoBlob(data);

            console.log("*******base64转blob对象******");
            console.log(blob);

            var formData = new FormData();
            formData.append("file", blob);
            console.log("********将blob对象转成formData对象********");
            console.log(formData.get("file"));

            // 发送请求;
            getLicenseNumberByImage(formData)
              .then(res => {
                this.license_number = res.license_number;
              })
              .catch(err => {
                Toast(err);
              });
          };
        };
      }
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.5);
      console.log("*******压缩后的图片大小*******");
      console.log(ndata);
      // console.log(ndata.length);
      return ndata;
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(base64Data.split(",")[1]);
      else byteString = unescape(base64Data.split(",")[1]);
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {
        type: mimeString
      });
    }
  }
};
</script>

<style lang="less" scoped>
.edit-layout {
  height: 100vh;

  .search-top {
    height: 20px;
  }

  .search-main {
    background-color: #fff;
    height: 300px;
    margin: 0 20px;
    border-radius: 5px;
    padding: 80px 20px 0;
    position: relative;

    .input-layout {
      display: flex;
    }

    .fl {
      flex: 0 0 200px;
      font-size: 0;
      margin-right: 20px;
    }

    .fr {
      flex: 0 0 80px;
      color: #f60;
      font-size: 36px;
      position: relative;

      .meihua {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        opacity: 0;
      }
    }
  }

  .wf-input {
    height: 20px;
    line-height: 20px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #f60;
    border-radius: 5px;
    width: 180px;
  }

  .search-btn {
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
    background: #f60;
    border-radius: 50%;
    position: absolute;
    bottom: -80px;
    left: 50%;
    margin-left: -80px;
  }

  .fa-edit {
    color: #fff;
  }
}
</style>
