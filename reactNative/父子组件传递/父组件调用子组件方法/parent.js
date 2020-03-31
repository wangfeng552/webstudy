import ChildNews from "./child";
export default class Child extends React.Component {
  getChildMethod = () => {
    this.refs.news.show();
    // eslint语法
    this.news.show();
  };
  render() {
    return (
      <View>
        <ChildNews ref="news" title="我是父组件的标题" />
        {/* eslint 推荐 */}
        <ChildNews
          ref={c => {
            this.news = c;
          }}
          title="我是父组件的标题"
        />
        <Button title="父组件的按钮" onPress={this.getChildMethod} />
      </View>
    );
  }
}

// 1.先给子组件定义ref
// 2.父组件通过调用 ref.news.(子组件的方法) 来调用
