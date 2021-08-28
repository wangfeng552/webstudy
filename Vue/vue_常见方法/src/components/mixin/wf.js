export default {
  data() {
    return {
      name: 'mixin',
      sex: 'girl'
    }
  },
  created() {
    console.log(111)
  },
  methods: {
    conflicting() {
      console.log('from mixin')
    }
  }
}


// 2.选项合并
// 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
// data(){
//   return {
//     name: 'com',
//     age: 24,
//     sex: 'girl'
//   }
// }


//3.同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
// =>111111
// =>222

// 4.值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
// => 'from self'