import React from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Colors from '../../constant/color';

const clearIcon = require('../../images/ic_close.png');

const mask = '◇◇◇ ◇◇◇◇ ◇◇◇◇';
export default class PhoneInput extends React.Component {
  static defaultProps = {
    value: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  setValue = text => {
    this.setState({
      value: this.getDisplayValueFor(text),
    });
  };

  onClear = () => {
    this.onChangeText('');
  };

  _renderClear = () => {
    const {value} = this.state;
    if (value && value.length > 0) {
      return (
        <TouchableOpacity style={styles.clearBox} onPress={this.onClear}>
          <Image style={styles.icon} source={clearIcon} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  getDisplayValueFor = text => {
    let rawValue = this.removeNotNumber(text);
    let result = this.getMaskedValue(rawValue);
    return result;
  };

  onChangeText = text => {
    this.setState({value: text});
    this.props.onChangeText &&
      this.props.onChangeText(this.removeNotNumber(text));
  };

  getMaskedValue = value => {
    let result = '';
    let maskCharIndex = 0;
    let valueCharIndex = 0;
    while (true) {
      if (maskCharIndex === mask.length) {
        break;
      }
      if (valueCharIndex === value.length) {
        break;
      }
      let valueChar = value[valueCharIndex];
      let maskChar = mask[maskCharIndex];

      if (maskChar === '◇') {
        result += valueChar;
        maskCharIndex++;
        valueCharIndex++;
      } else {
        result += maskChar;
        maskCharIndex++;
      }
    }
    return result;
  };

  removeNotNumber = text => {
    return text.replace(/[^0-9]+/g, '');
  };

  render() {
    const {style, ...props} = this.props;
    const {value} = this.state;
    return (
      <View style={[styles.container, style]}>
        <TextInput
          {...props}
          value={this.getDisplayValueFor(value)}
          onChangeText={text => this.onChangeText(text)}
          style={styles.textInput}
          maxLength={13}
          keyboardType="phone-pad"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          placeholderTextColor={Colors.placeholder}
        />
        {this._renderClear()}
      </View>
    );
  }
}
