import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {showVerifyPopup} from '../../actions/MerStaff';
import styles from './styles';

const checkimg = require('../../images/ic_checked.png');
const uncheckimg = require('../../images/ic_check_gray.png');

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked,
    };
  }

  _check = (dispatch, id) => {
    dispatch(showVerifyPopup(true, id));
  };

  _renderBtnCheck = (item, dispatch) => {
    if (item.status === 'failure') {
      return (
        <View style={styles.typeBox}>
          <Text style={styles.typeTitle}>审核失败</Text>
        </View>
      );
    }
    if (item.status === 'success') {
      return (
        <View style={styles.typeSuccess}>
          <Text style={styles.typeTitle}>审核通过</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.clickBtn}
        onPress={() => {
          this._check(dispatch, item.id);
        }}>
        <Text style={styles.typeTitle}>待审核</Text>
      </TouchableOpacity>
    );
  };

  _renderIsCheck = isChecked => {
    if (isChecked) {
      return <ImageBackground style={styles.checkimg} source={checkimg} />;
    }
    return <ImageBackground style={styles.checkimg} source={uncheckimg} />;
  };

  onClickChecked = () => {
    const {checkPerson, item, index} = this.props;
    checkPerson && checkPerson(item, !item.isChecked, index);
  };

  _renderCheckBox = item => {
    if (!item.isShow) {
      return <View />;
    }

    return (
      <TouchableOpacity
        style={styles.checkimgbtn}
        onPress={this.onClickChecked}>
        {this._renderIsCheck(item.isChecked)}
        <Text>{item.isChecked === true ? 1 : '2'}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {item, dispatch} = this.props;
    return (
      <View style={styles.itemBox}>
        <View style={styles.leftBox}>
          {this._renderCheckBox(item)}
          <Image style={styles.headImg} source={{uri: item.memberFaceImgUrl}} />
          <View style={styles.titleBox}>
            <Text style={styles.title}>
              {item.memberTitle === null
                ? item.memberRealName
                : item.memberTitle}
            </Text>
            <Text style={styles.subTitle}>{item.memberMobile}</Text>
          </View>
        </View>
        {this._renderBtnCheck(item, dispatch)}
      </View>
    );
  }
}
