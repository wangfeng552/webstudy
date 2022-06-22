<template>
  <div>
    <!-- 拖拽form表单元素 -->
    <div class="ele-body">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-card shadow="never">
            <div class="col">
              <el-row>
                <div class="base_title">基础字段</div>
                <el-divider></el-divider>
                <draggable
                  v-model="arr1"
                  @end="end1"
                  :options="{
                    group: { name: 'tt', pull: 'clone' },
                    sort: false,
                  }"
                  animation="300"
                  style="width: 100%; min-height: 330px"
                >
                  <!-- <transition-group> -->
                  <div v-for="item in arr1" :key="item.id">
                    <div class="base_style">
                      <span class="el-icon-circle-check icon"></span>
                      {{ item.name }}
                    </div>
                  </div>
                  <!-- </transition-group> -->
                </draggable>
              </el-row>
              <el-row>
                <div class="base_title remark_margin">特殊字段</div>
                <el-divider></el-divider>
                <draggable
                  v-model="arr2"
                  @end="end1"
                  :options="{
                    group: { name: 'tt', pull: 'clone' },
                    sort: false,
                  }"
                  animation="300"
                  style="width: 100%; min-height: 330px"
                >
                  <!-- <transition-group> -->
                  <div v-for="item in arr2" :key="item.id">
                    <div class="base_style">
                      <span class="el-icon-circle-check icon"></span>
                      {{ item.name }}
                    </div>
                  </div>
                  <!-- </transition-group> -->
                </draggable>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card shadow="never">
            <div class="col">
              <draggable
                v-model="arr3"
                :options="{ group: { name: 'tt', pull: '' }, sort: true }"
                animation="300"
                :move="onMove"
                style="width: 100%; min-height: 330px"
              >
                <!-- <transition-group> -->
                <div v-for="(item, index) in arr3" :key="index">
                  <div
                    v-if="item.type == 'text'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      {{ item.name }}
                      <div class="static_border">
                        <el-input v-model="item.value"></el-input>
                      </div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i
                      ></el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'textarea'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      {{ item.name }}
                      <div class="static_border static_textarea">
                        <span class="static_bias">//</span>
                      </div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i
                      ></el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'select'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      {{ item.name }}
                      <div class="static_border static_textarea">
                        <span class="el-icon-arrow-down static_select"></span>
                      </div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'number'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      {{ item.name }}
                      <div class="static_border"></div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'radio'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="circle_wrap">
                      {{ item.name }}
                      <span class="static_circle"></span>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'checkbox'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="circle_wrap">
                      {{ item.name }}
                      <span class="static_react"></span>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'datetime'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      <span>
                        {{ item.name }}
                      </span>
                      <div class="static_border static_textarea">
                        <span class="el-icon-time static_time"></span>
                      </div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'daterange'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      {{ item.name }}
                      <div class="static_border static_textarea">
                        <span class="el-icon-date static_time"></span>
                      </div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'place'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      {{ item.name }}
                      <div class="static_border"></div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'image'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="image_wrap">
                      {{ item.name }}
                      <span
                        style="font-size: 40px; line-height: 60px"
                        class="el-icon-picture"
                      ></span>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'file'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="file_wrap">
                      {{ item.name }}
                      <div class="static_file">点击上传</div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'tel'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      {{ item.name }}
                      <div class="static_border"></div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'button'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="file_wrap">
                      {{ item.name }}
                      <div class="static_file"></div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'signature'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      {{ item.name }}
                      <div class="static_border"></div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'content'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      {{ item.name }}
                      <div class="static_border"></div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'city'"
                    class="base_margin"
                    @click="showMenu(item)"
                  >
                    <div class="static_wrap">
                      {{ item.name }}
                      <div class="static_border static_textarea">
                        <span class="el-icon-arrow-down static_select"></span>
                      </div>
                    </div>
                    <div>
                      <el-button type="text" @click="deleteDomain(index)"
                        ><i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-if="item.type == 'example'"
                    class="base_margin"
                    style="visibility: hidden"
                  >
                    <div class="static_wrap">
                      <span style="color: red">{{ item.name }}</span>
                      <div class="static_border"></div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <!-- </transition-group> -->
              </draggable>
            </div></el-card
          ></el-col
        >
        <el-col :span="7"
          ><el-card shadow="never">
            <div class="col">
              <div
                style="
                  text-align: center;
                  margin-bottom: 10px;
                  font-weight: bold;
                  color: rgb(2, 167, 240);
                "
              >
                字段属性
              </div>
              <el-divider></el-divider>
              <div v-if="isShow">
                <el-form
                  :model="controlForm"
                  ref="controlForm"
                  label-width="100px;"
                >
                  <div class="remark_margin">控件说明</div>
                  <div class="remark_margin">
                    此控件 {{ controlForm.remark }}
                  </div>
                  <div class="remark_margin">大小：</div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      margin-bottom: 10px;
                    "
                  >
                    <div>
                      长
                      <el-input
                        class="base_input"
                        v-model="controlForm.height"
                      ></el-input>
                    </div>
                    <div>
                      宽
                      <el-input
                        class="base_input"
                        v-model="controlForm.width"
                      ></el-input>
                    </div>
                  </div>
                  <el-form-item label="标题："
                    ><el-input
                      v-model="controlForm.label"
                      style="width: calc(100% - 20px)"
                    ></el-input
                  ></el-form-item>
                  <el-form-item
                    ><el-checkbox-group v-model="controlForm.checkList">
                      <el-checkbox label="1">显示标题</el-checkbox>
                      <el-checkbox label="2"
                        >换行</el-checkbox
                      ></el-checkbox-group
                    ></el-form-item
                  >
                  <el-form-item label="提示文字："
                    ><el-input
                      v-model="controlForm.placeholder"
                      style="width: calc(100% - 20px)"
                    ></el-input
                  ></el-form-item>
                  <el-form-item label="默认值："
                    ><el-select v-model="controlForm.default">
                      <el-option label="自定义" :value="1" />
                      <el-option label="关联系统表" :value="2" /> </el-select
                  ></el-form-item>
                  <el-form-item label="选格式："
                    ><el-select v-model="controlForm.format">
                      <el-option label="文本" :value="1" />
                      <el-option label="手机号" :value="2" />
                      <el-option label="邮箱" :value="3" />
                      <el-option label="身份证号" :value="4" />
                      <el-option label="邮政编码" :value="5" /> </el-select
                  ></el-form-item>
                  <div style="margin-bottom: 20px">校验：</div>
                  <el-form-item>
                    <el-checkbox-group v-model="controlForm.checked">
                      <el-checkbox label="1">必填</el-checkbox
                      ><el-checkbox label="2">不允许重复</el-checkbox
                      ><el-checkbox label="3"
                        >脱敏</el-checkbox
                      ></el-checkbox-group
                    >
                  </el-form-item>
                  <div style="margin-bottom: 20px">字段权限：</div>
                  <el-form-item>
                    <el-checkbox-group v-model="controlForm.force">
                      <el-checkbox label="3">指定人员可见</el-checkbox>
                      <el-checkbox label="1">可见</el-checkbox
                      ><el-checkbox label="2">可编辑</el-checkbox
                      ><el-checkbox label="4">指定人员可编辑</el-checkbox
                      ><el-checkbox label="5">导入</el-checkbox
                      ><el-checkbox label="6"
                        >导出</el-checkbox
                      ></el-checkbox-group
                    >
                  </el-form-item>
                </el-form>
                <div
                  slot="footer"
                  style="display: flex; justify-content: center"
                >
                  <el-button icon="el-icon-close">重置</el-button>
                  <el-button type="primary" @click="fieldSave">保存</el-button>
                </div>
              </div>
            </div></el-card
          ></el-col
        >
      </el-row>
    </div>
  </div>
</template>
<script>
//导入draggable组件
import draggable from "vuedraggable"
export default {
  //注册draggable组件
  name: "oa_template_add",
  components: {
    draggable,
  },
  data() {
    return {
      //基本字段
      arr1: [
        { id: 1, icon: "", name: "单行文本框", type: "text" },
        { id: 2, icon: "", name: "多行文本框", type: "textarea" },
        { id: 3, icon: "", name: "下拉列表框", type: "select" },
        { id: 4, icon: "", name: "数字文本框", type: "number" },
        { id: 5, icon: "", name: "单选按钮组", type: "radio" },
        { id: 6, icon: "", name: "复选框组", type: "checkbox" },
        { id: 7, icon: "", name: "日期时间框", type: "datetime" },
        { id: 8, icon: "", name: "日期区间", type: "daterange" },
      ],
      //特殊字段
      arr2: [
        { id: 9, icon: "", name: "地址框", type: "place" },
        { id: 10, icon: "", name: "图片", type: "image" },
        { id: 12, icon: "", name: "附件", type: "file" },
        { id: 13, icon: "", name: "手机号", type: "tel" },
        { id: 14, icon: "", name: "按钮", type: "button" },
        { id: 16, icon: "", name: "手写签名", type: "signature" },
        { id: 15, icon: "", name: "内容联动", type: "content" },
        { id: 17, icon: "", name: "城市级联", type: "city" },
      ],
      // arr3: [{ id: 100, icon: "", name: "示例框", type: "example" }],
      arr3: [],

      controlForm: {
        width: "",
        height: "",
        label: "",
        checkList: [],
        checked: [],
        force: [],
        placeholder: "",
        default: "",
        format: "",
        type: "",
        remark: "",
        id: "",
      },
      //顶部表单
      top_form: {
        name: "",
        molds: "",
        state: "",
        field: [],
      },
      formArr: [],
      isShow: false, //字段属性是否显示
    }
  },
  methods: {
    //左侧拖动结束时的事件
    end1() {
      let arr5 = []
      //对数组进行重新赋值，使其id等于下标
      this.arr3.forEach((d, index) => {
        arr5.push({
          id: index,
          name: d.name,
          type: d.type,
          value: "",
        })
      })
      this.arr3 = arr5
    },
    //内部拖拽时触发的方法
    onMove(e) {
      //e.draggedContext.index为拖拽前的下标，e.draggedContext.futureIndex为拖拽后的下标
      // console.log(e);
      // console.log(e.draggedContext.index, e.draggedContext.futureIndex);
    },
    //删除按钮
    deleteDomain(index) {
      this.arr3.splice(index, 1)
    },
    //字段表单的显示与隐藏
    showMenu(e) {
      this.isShow = true
      // console.log(e);
      this.controlForm.remark = e.name
      this.controlForm.id = e.id
      this.controlForm.type = e.type
    },
    //提交字段表单
    fieldSave() {
      this.formArr.push(this.controlForm)
      // console.log(this.controlForm);
      // let newArr = this.top_form.field;
      // newArr.push(this.controlForm);
      // if (newArr.length == 0) {
      //   newArr.push(this.controlForm);
      // } else {
      //   for (var i = 0; i < newArr.length; i++) {
      //     if (newArr[i].id == this.controlForm.id) {
      //       newArr[i] = this.controlForm;
      //       this.$message.warning("警告");
      //     } else {
      //       newArr.push(this.controlForm);
      //       this.$message.success("添加");
      //     }
      //   }
      // }
      // console.log(this.top_form);
    },
    //提交form表单
    formSave() {
      this.top_form.field = this.formArr
      console.log(this.top_form)
    },
  },
}
</script>
<style scoped>
.col {
  background-color: #fff;
  height: 750px;
  overflow: scroll;
}
.base_title {
  font-size: 18px;
  width: 80px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
}
.base_style {
  width: 135px;
  height: 35px;
  border: 1px solid #999;
  line-height: 35px;
  text-align: center;
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  text-align: left;
  cursor: pointer;
}
.icon {
  color: rgb(86, 169, 251);
  margin-right: 5px;
  margin-left: 10px;
}
.base_input {
  width: 160px;
}
.base_margin {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgba(235, 248, 251, 1);
  height: 80px;
  line-height: 60px;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.remark_margin {
  margin-top: 10px;
  margin-bottom: 10px;
}
.body_top {
  padding: 15px 15px 0 15px;
}
/* 中间静态框css样式 */
.static_wrap {
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.static_border {
  width: 200px;
  height: 36px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #c0c4cc;
  cursor: pointer;
}
.static_textarea {
  position: relative;
}
.static_bias {
  position: absolute;
  right: 2px;
  top: 0;
  font-size: 12px;
}
.static_select {
  position: absolute;
  right: 5px;
  top: 10px;
}
.circle_wrap {
  width: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.static_circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #c0c4cc;
  cursor: pointer;
}
.static_react {
  width: 10px;
  height: 10px;
  border: 1px solid #c0c4cc;
  cursor: pointer;
}
.static_time {
  position: absolute;
  left: 10px;
  top: 10px;
}
.image_wrap {
  width: 135px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.file_wrap {
  width: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.static_file {
  width: 80px;
  height: 40px;
  background-color: rgb(86, 169, 251);
  text-align: center;
  line-height: 40px;
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
}
</style>
