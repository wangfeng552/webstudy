<template>
  <div class="tab">
    <div class="nav">
      <ul>
        <li v-for="(v,i) in names" :class="{act:v.isShow}" @click="tabtoggle(i)">{{v.name}}</li>
      </ul>
    </div>
    <div class="mingci">
      <div v-for="v in city[key1]">
        <input type="checkbox" :id="v.id" :value="v.name" v-model="quanguo">
        <label :for="v.id">{{v.name}}</label>
      </div>
    </div>
    <el-tag v-for="tag in quanguo" :key="tag" :closable="true" @close="handleClose(tag)" type="primary" > {{tag}} </el-tag>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        key1:'',
        quanguo:[],
        names: [
          {name: '上海', id: '0', isShow: true},
          {name: '北京', id: '1', isShow: false},
          {name: '武汉', id: '2', isShow: false}
        ],
        city: {
          "0": [
            { "id": "52", "name": "徐汇"},
            { "id": "53", "name": "奉贤"},
          ],
          "1": [
            { "id": "54", "name": "东城"},
            { "id": "55", "name": "西城"},
            { "id": "56", "name": "北城"},
            { "id": "57", "name": "南城"},
          ],
          "2": [
            { "id": "54", "name": "阿斯蒂芬"},
            { "id": "55", "name": "sad"},
            { "id": "56", "name": "北ghfdgfds城"},
            { "id": "57", "name": "asdfsa"},
          ],
        }
      }
    },
    methods: {
      tabtoggle(key) {
        this.names.forEach(function (v) {
          v.isShow = false
        })
        this.names[key].isShow = true;
        this.key1 = key
      },
      handleClose(tag) {
        this.quanguo.splice(this.quanguo.indexOf(tag), 1);
      },
    }
  }
</script>

<style>
  .act{color: #00a8dc}
</style>
