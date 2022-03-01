import React, {Component} from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  showVerifyPopup,
  getIdentityValue,
  staffCheck,
  showFixDel,
} from '../../actions/MerStaff';
import Toast from '../../utils/Toast';
const closeImg = require('../../images/ic_close_black.png');

class PopupStaff extends Component {
  closePopup = () => {
    const {dispatch} = this.props;
    dispatch(showVerifyPopup(false, ''));
    dispatch(getIdentityValue(''));
  };

  cancelPopup = () => {
    const {dispatch, userID, identityValue, navIndex, token} = this.props;
    if (identityValue === '') {
      Toast.show('请填写完整在提交');
      return;
    }
    dispatch(staffCheck(userID, 'failure', identityValue, navIndex, token));
    dispatch(showFixDel(false))
  };

  submitPopup = () => {
    const {dispatch, userID, identityValue, navIndex, token} = this.props;
    if (identityValue === '') {
      Toast.show('请填写完整在提交');
      return;
    }
    dispatch(staffCheck(userID, 'success', identityValue, navIndex, token));
    dispatch(showFixDel(false))
  };

  getIdentityValue = v => {
    const {dispatch} = this.props;
    dispatch(getIdentityValue(v));
  };

  render() {
    const {verifyPopupShow} = this.props;
    return (
      <Modal animationType="fade" transparent={true} visible={verifyPopupShow}>
        <View style={styles.modalBackgroundStyle}>
          <View style={styles.innerContainerPopup}>
            <Text style={styles.checktitle}>请核实员工身份信息</Text>
            <TouchableOpacity
              onPress={this.closePopup}
              style={styles.closePopup}>
              <Image source={closeImg} style={styles.closeimg} />
            </TouchableOpacity>
            <TextInput
              placeholder="请输入"
              style={styles.checkinput}
              onChangeText={this.getIdentityValue}
            />
            <View style={styles.btnPopupWrap}>
              <TouchableOpacity onPress={this.cancelPopup}>
                <Text style={styles.textcancel}>拒绝</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.submitPopup}>
                <Text style={styles.textsure}>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {
    all,
    allNums,
    allStart,
    pullDropRefresh,
    pullUpRefresh,
    verifyPopupShow,
    userID,
    identityValue,
    navIndex,
  } = state.MerStaff;
  const {token} = state.UserInfo;
  return {
    all,
    allNums,
    allStart,
    pullUpRefresh,
    pullDropRefresh,
    verifyPopupShow,
    userID,
    token,
    identityValue,
    navIndex,
  };
}

export default connect(mapStateToProps)(PopupStaff);
