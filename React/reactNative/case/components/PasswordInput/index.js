import React from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Colors from '../../constant/color';

const showSource = require('../../images/ic_eye_open.png');
const hideSource = require('../../images/ic_eye_close.png');

export default class PasswordInput extends React.Component {
  static defaultProps = {
    value: '',
    secure: true,
    placeholder: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      secure: props.secure,
    };
  }

  onChangeText = text => {
    this.setState({value: text});
    this.props.onChangeText && this.props.onChangeText(text);
  };

  render() {
    const {placeholder, style} = this.props;
    const {value, secure} = this.state;
    const eyeSource = secure ? hideSource : showSource;
    return (
      <View style={[styles.container, style]}>
        <TextInput
          value={value}
          maxLength={20}
          onChangeText={text => this.onChangeText(text)}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={'none'}
          underlineColorAndroid={'transparent'}
          secureTextEntry={secure}
        />
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => {
            this.setState({secure: !secure});
          }}>
          <Image style={styles.eyeIcon} source={eyeSource} />
        </TouchableOpacity>
      </View>
    );
  }
}
