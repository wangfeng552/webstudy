<template>
<div class="layout" @click="toggleWFdiv($event)">
  <div class="closediv" id="toggleDiv" v-if="isShowDiv">要切换的div</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      isShowDiv: false
    }
  },
  methods: {
    toggleWFdiv(event) {
      let sp = document.getElementById("toggleDiv");
      if (sp) {
        if (!sp.contains(event.target)) { // 这句是说如果我们点击到了id为myPanel以外的区域
          this.isShowDiv = false
        }
      }
    }
  }
}
// Node.contains() 用于检测 （） 内给的节点是不是 Node 节点的子节点 -- 返回 Boolean 类型

var contains = function (a, b, itself) {
  // 第一个节点是否包含第二个节点
  //contains 方法支持情况：chrome+ firefox9+ ie5+, opera9.64+(估计从9.0+),safari5.1.7+
  if (itself && a == b) {
    return true
  }
  if (a.contains) {
    if (a.nodeType === 9)
      return true;
    return a.contains(b);
  } else if (a.compareDocumentPosition) {
    return !!(a.compareDocumentPosition(b) & 16);
  }
  while ((b = b.parentNode))
    if (a === b) return true;
  return false;
}
</script>
