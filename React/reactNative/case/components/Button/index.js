import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import Color from '../../constant/color';
import styles from './styles';

export default class Button extends React.Component {
  static defaultProps = {
    disabled: false,
  };

  onClick = () => {
    this.props.onPress && this.props.onPress();
  };

  render() {
    const {style, value, disabled} = this.props;
    let backgroundColor = Color.btnEnable;
    let elevation = 4;
    if (disabled) {
      backgroundColor = Color.btnDisable;
      elevation = 0;
    }
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => this.onClick()}
        style={[styles.container, {backgroundColor, elevation}, style]}>
        <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
    );
  }
}
