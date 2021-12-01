<script>
export default {
  functional: true,
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  render(createElement, context) {
    console.log(context)
    const { title } = context.props
    return createElement("div", [createElement("h2", title)])
  },
  // 方法二
  render(createElement, context) {
    const { title } = context.props
    const vnodes = []
    vnodes.push(<span>{title}</span>)
    vnodes.push(context.children) // 渲染slot的内容
    return vnodes
  },
}
</script>
