import React from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Toast from '../../utils/Toast';

import styles from './styles';

import PasswordInput from '../../components/PasswordInput';
import PhoneInput from '../../components/PhoneInput';
import SMSButton from '../../components/SMSButton';
import Button from '../../components/Button';

import {
  setModle,
  inputPhone,
  inputPassword,
  inputCode,
  getCode,
  signInByPassword,
  signInByCode,
  clearSignIn,
} from '../../actions/SignIn';

const nextIcon = require('../../images/ic_next_mer.png');
const closeIcon = require('../../images/ic_close_black.png');

const myReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

class SignIn extends React.Component {
  static navigationOptions = () => ({
    headerShown: false,
  });

  componentDidMount() {
    const {telePhone, dispatch} = this.props;
    if (telePhone && telePhone !== '') {
      this.phoneView && this.phoneView.setValue(telePhone);
      dispatch(inputPhone(telePhone));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearSignIn());
  }

  onClickRegister = () => {
    const {navigation} = this.props;
    navigation.replace('Register');
  };

  inputPhone = phone => {
    const {dispatch} = this.props;
    dispatch(inputPhone(phone));
  };

  inputPassword = password => {
    const {dispatch} = this.props;
    dispatch(inputPassword(password));
  };

  onClickForget = () => {
    const {navigation} = this.props;
    navigation.navigate('FindPassword');
  };

  onChangeModle = () => {
    const {modle, dispatch} = this.props;
    dispatch(setModle((modle + 1) % 2));
  };

  onSignIn = () => {
    const {
      modle,
      phone,
      password,
      tempToken,
      code,
      dispatch,
      navigation,
    } = this.props;
    if (!myReg.test(phone)) {
      Toast.show('请输入有效手机号！');
      return;
    }
    if (modle === 0) {
      dispatch(signInByPassword(phone, password));
    } else if (modle === 1) {
      dispatch(signInByCode(phone, code, tempToken, navigation));
    }
  };

  onClickProtocol = () => {
    // const {navigation} = this.props;
    // navigation.navigate('Agreement');
  };

  _renderProtocol = () => {
    let protocol = '《用户协议与隐私政策》';
    return (
      <View style={styles.protocolContainer}>
        <Text style={styles.protocolText}>
          登录即表示同意{'  '}
          <Text style={styles.protocolName} onPress={this.onClickProtocol}>
            {protocol}
          </Text>
        </Text>
      </View>
    );
  };

  onClickClose = () => {
    const {navigation} = this.props;
    navigation.navigate('App');
  };

  _renderPasswordBox = () => {
    return (
      <View style={styles.authBox}>
        <PasswordInput
          style={styles.authInput}
          placeholder="请输入密码"
          maxLength={20}
          autoFocus={false}
          onChangeText={this.inputPassword}
        />
        <View style={styles.line} />
        <TouchableOpacity style={styles.forgetBox} onPress={this.onClickForget}>
          <Text style={styles.forgetText}>忘记密码？</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderCodeBox = () => {
    const {code} = this.props;
    return (
      <View style={[styles.authBox, styles.border]}>
        <TextInput
          value={code}
          onChangeText={this.inputCode}
          style={styles.authInput}
          keyboardType="numeric"
          placeholder="请输入验证码"
          placeholderTextColor={'#d7d7d7'}
          maxLength={5}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
        />
        {this._renderCodeButton()}
      </View>
    );
  };

  inputCode = code => {
    const {dispatch} = this.props;
    dispatch(inputCode(code));
  };

  _renderCodeButton = () => {
    const {phone, codeButton} = this.props;
    let disabled = true,
      showLoading = false;
    if (codeButton.status === 'idle' && phone.length === 11) {
      disabled = false;
    }
    if (codeButton.status === 'request') {
      showLoading = true;
    }
    return (
      <SMSButton
        disabled={disabled}
        value={codeButton.value}
        showLoading={showLoading}
        onPress={this.onRequestCode}
      />
    );
  };

  onRequestCode = () => {
    const {phone, dispatch} = this.props;
    if (myReg.test(phone)) {
      dispatch(getCode(phone));
    } else {
      Toast.show('请输入有效手机号！');
    }
  };

  otherVerifyType = () => {
    const {modle} = this.props;
    if (modle === 0) {
      return '验证码登录';
    } else {
      return '密码登录';
    }
  };

  render() {
    const {modle, phone, password, code} = this.props;
    let btnIsDisable = true;
    if (phone && phone.length === 11) {
      if (modle === 0 && password && password.length > 0) {
        btnIsDisable = false;
      } else if (modle === 1 && code && code.length === 5) {
        btnIsDisable = false;
      }
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={this.onClickClose}>
          <Image style={styles.closeIcon} source={closeIcon} />
        </TouchableOpacity>
        <View style={styles.topContainer}>
          <Text style={styles.signInText}>登录</Text>
          <TouchableOpacity
            style={styles.registerBox}
            onPress={this.onClickRegister}>
            <Text style={styles.registerText}>注册新用户</Text>
            <Image style={styles.nextIcon} source={nextIcon} />
          </TouchableOpacity>
        </View>

        <PhoneInput
          ref={ref => {
            this.phoneView = ref;
          }}
          style={styles.phoneInput}
          value={phone}
          onChangeText={this.inputPhone}
          autoFocus={true}
          placeholder="请输入手机号"
        />

        {modle === 0 ? this._renderPasswordBox() : this._renderCodeBox()}

        <Button
          style={styles.loginBtn}
          disabled={btnIsDisable}
          value="登录"
          onPress={this.onSignIn}
        />
        <TouchableOpacity style={styles.rightBox} onPress={this.onChangeModle}>
          <Text style={styles.otherVerifyType}>{this.otherVerifyType()}</Text>
        </TouchableOpacity>
        {this._renderProtocol()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    modle,
    phone,
    password,
    code,
    agreeProtocol,
    tempToken,
    codeButton,
  } = state.SignIn;
  const {telePhone} = state.UserInfo;
  return {
    telePhone,
    modle,
    phone,
    password,
    code,
    agreeProtocol,
    tempToken,
    codeButton,
  };
}

export default connect(mapStateToProps)(SignIn);
