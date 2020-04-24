import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import AppNavigator from './navigators/AppNavigator';

export default class Root extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
