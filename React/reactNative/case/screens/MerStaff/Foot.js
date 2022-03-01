import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

export default class Foot extends Component {
  render() {
    return (
      <View style={styles.footContainer}>
        <View style={styles.footBorder} />
        <Text style={styles.fontText}>没有更多数据了</Text>
        <View style={styles.footBorder} />
      </View>
    );
  }
}
