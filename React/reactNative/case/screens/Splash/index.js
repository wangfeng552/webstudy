import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {addCount} from '../../actions/Splash';

class Splash extends React.Component {
  onClick = () => {
    const {count, dispatch} = this.props;
    dispatch(addCount(count + 1));
  };

  render() {
    const {count} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.content}>欢迎页{count}</Text>
        <Button title={'add'} onPress={this.onClick} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
});

function mapStateToProps(state) {
  const {count} = state.Splash;

  return {
    count,
  };
}

export default connect(mapStateToProps)(Splash);
