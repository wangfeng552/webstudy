<template>
  <div>
    <ul>
      <li v-for="(v,i) in person" @click="showChosePerson(i)">操作者：{{v.people}} <a href="" @click.prevent="showChosePerson(i)" v-if="v.people!='选择人员'">变更人员</a></li>
    </ul>
    <div class="mk">
      <ul>
        <li @click="tihuan(i)" v-show="classShow" v-for="(v,i) in classes">{{v.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        classShow:false,
        personIndex:'',
        person:[
          {people:'选择人员'},
          {people:'选择人员'},
          {people:'选择人员'},
        ],
        classes:[
          {name:'张三'},
          {name:'垃圾袋三'},
          {name:'华工科技'},
          {name:'热死的'},
        ]

      }
    },
    methods:{
      showChosePerson(i){
        this.classShow = true;
        this.personIndex = i;
      },
      tihuan(i){
        this.person[this.personIndex].people = this.classes[i].name
      }
    }
  }
</script>
