import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  inputPhone,
  inputSMSCode,
  inputOldPhone,
  inputOldSMSCode,
  getSMSCode,
  BindPhone,
  submitFinshPhone,
  clearCompany,
  getOldSMSCode,
  verifyOldPhone,
} from '../../actions/MerEditShop';
import {PhoneInput, SMSButton, Button} from '../../components';
import Color from '../../constant/color';

class EditShopTel extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '联系电话',
  });

  componentDidMount() {
    const {dispatch, shopPhone} = this.props;
    if (shopPhone === undefined || shopPhone === null) {
      dispatch(BindPhone(false));
    } else {
      dispatch(BindPhone(true));
      dispatch(inputOldPhone(shopPhone));
    }
  }
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(clearCompany());
  }

  inputPhone = phone => {
    const {dispatch} = this.props;
    dispatch(inputPhone(phone));
  };
  inputOldPhone = phone => {
    const {dispatch} = this.props;
    dispatch(inputOldPhone(phone));
  };

  inputSMSCode = code => {
    const {dispatch} = this.props;
    dispatch(inputSMSCode(code));
  };

  inputOldSMSCode = code => {
    const {dispatch} = this.props;
    dispatch(inputOldSMSCode(code));
  };

  onRequestSMS = () => {
    const {phone, dispatch, token} = this.props;
    dispatch(getSMSCode(phone, token));
  };
  onRequestOldSMS = () => {
    const {dispatch, token} = this.props;
    dispatch(getOldSMSCode(token));
  };

  _renderSMSCodeButton = () => {
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
        style={styles.mr10}
        disabled={disabled}
        value={codeButton.value}
        showLoading={showLoading}
        onPress={this.onRequestSMS}
      />
    );
  };
  _renderOldSMSCodeButton = () => {
    const {codeButton} = this.props;
    let disabled = true,
      showLoading = false;
    if (codeButton.status === 'idle') {
      disabled = false;
    }
    if (codeButton.status === 'request') {
      showLoading = true;
    }

    return (
      <SMSButton
        style={styles.mr10}
        disabled={disabled}
        value={codeButton.value}
        showLoading={showLoading}
        onPress={this.onRequestOldSMS}
      />
    );
  };
  nextSubmitPhone = () => {
    const {dispatch, oldCode, token} = this.props;
    dispatch(verifyOldPhone(oldCode, token));
  };
  _renderOldPhone = () => {
    const {shopPhone, oldCode} = this.props;
    let oldDisabled = true;
    if (oldCode !== '') {
      oldDisabled = false;
    }

    return (
      <View>
        <View style={styles.layouttel}>
          <Text style={styles.oldphone}>{shopPhone}</Text>
          <View style={styles.smsCodeBox}>
            <TextInput
              value={oldCode}
              onChangeText={this.inputOldSMSCode}
              style={styles.smsCodeInput}
              keyboardType="numeric"
              placeholder="请输入验证码"
              placeholderTextColor={Color.placeholder}
              maxLength={6}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
            {this._renderOldSMSCodeButton()}
          </View>
        </View>
        <Button
          onPress={this.nextSubmitPhone}
          style={styles.nextBtn}
          value="下一步"
          disabled={oldDisabled}
        />
      </View>
    );
  };
  finshPhone = () => {
    const {phone, SMSCode, token, dispatch} = this.props;
    dispatch(submitFinshPhone(phone, SMSCode, token));
  };
  _renderNewPhone = () => {
    const {phone, SMSCode} = this.props;
    let isDisabled = true;
    if (phone.length === 11 && SMSCode !== '') {
      isDisabled = false;
    }
    return (
      <View>
        <View style={styles.layouttel}>
          <PhoneInput
            style={styles.inputlist}
            value={phone}
            onChangeText={this.inputPhone}
            autoFocus={true}
            placeholder="请输入新手机号"
            placeholderTextColor={Color.placeholder}
          />
          <View style={styles.smsCodeBox}>
            <TextInput
              value={SMSCode}
              onChangeText={this.inputSMSCode}
              style={styles.smsCodeInput}
              keyboardType="numeric"
              placeholder="请输入验证码"
              placeholderTextColor={Color.placeholder}
              maxLength={6}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
            {this._renderSMSCodeButton()}
          </View>
        </View>
        <Button
          onPress={this.finshPhone}
          style={styles.nextBtn}
          value="完成"
          disabled={isDisabled}
        />
      </View>
    );
  };

  render() {
    const {isBindPhone, phone} = this.props;
    if (isBindPhone) {
      return <View style={styles.layout}>{this._renderOldPhone()}</View>;
    }
    return (
      <View style={styles.layout}>
        {this._renderNewPhone()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    oldPhone,
    oldCode,
    phone,
    SMSCode,
    codeButton,
    isBindPhone,
  } = state.MerEditShop;
  const {shopPhone} = state.MerShopInfo;
  const {token} = state.UserInfo;

  return {
    oldPhone,
    oldCode,
    phone,
    SMSCode,
    codeButton,
    shopPhone,
    isBindPhone,
    token,
  };
}

export default connect(mapStateToProps)(EditShopTel);
