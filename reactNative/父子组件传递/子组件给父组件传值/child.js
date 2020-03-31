export default class Child extends React.Component {
  render(){
    return (
      <View>
      <Text>{this.props.title}</Text>
      <Button
        onPress={() => {
          this.props.parentClick('children');
        }}
        title="子组件的按钮"
      />
    </View>

    )
  }
}

// 1.在子组件中通过this.props. parentClick('传值' ) 