import React from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';

import Color from '../../constant/color';
import styles from './styles';

export default class SMSButton extends React.Component {
  static defaultProps = {
    disabled: false,
    value: '获取验证码',
    showLoading: false,
  };

  onClick = () => {
    this.props.onPress && this.props.onPress();
  };

  _renderIndicator = () => {
    const {showLoading} = this.props;
    if (showLoading) {
      return (
        <ActivityIndicator
          style={styles.indicator}
          size="small"
          color="white"
        />
      );
    }
    return <View />;
  };

  render() {
    const {disabled, value, style} = this.props;
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
        {this._renderIndicator()}
        <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
    );
  }
}
