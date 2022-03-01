import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {getMerchantInfo} from '../../actions/MerchantCA';

const placeholderPic = require('../../images/ic_upload_img.png');
const startingImg = require('../../images/ic_rz_starting.png');
const finshImg = require('../../images/ic_rz_finish.png');
const errorImg = require('../../images/ic_rz_error.png');
class MerDetail extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '商户认证详情',
    headerRight: () => (
      <Text
        style={styles.navRightBtn}
        onPress={() => {
          navigation.navigate('MerchantCA');
        }}>
        更新
      </Text>
    ),
  });
  componentDidMount() {
    const {dispatch, token} = this.props;
    dispatch(getMerchantInfo(token));
  }

  _renderItemHeader = title => {
    return <Text style={styles.headText}>{title}</Text>;
  };

  _renderItem = (title, data) => {
    return (
      <View style={styles.itemBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.titleright}>{data}</Text>
      </View>
    );
  };

  _renderAddLicenseImg = () => {
    const {licenseImg} = this.props;
    if (licenseImg === '') {
      return (
        <View style={styles.uploadimg}>
          <TouchableOpacity>
            <Image style={styles.uploadImgWidth} source={placeholderPic} />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.uploadimg}>
        <TouchableOpacity>
          <Image style={styles.uploadImgWidth} source={{uri: licenseImg}} />
        </TouchableOpacity>
      </View>
    );
  };
  _renderIcon = licenseState => {
    console.log(licenseState);
    if (licenseState === 2) {
      return <Image source={startingImg} style={styles.rzpic} />;
    } else if (licenseState === 1) {
      return <Image source={finshImg} style={styles.rzpic} />;
    } else if (licenseState === 3) {
      return <Image source={errorImg} style={styles.rzpic} />;
    }
  };

  render() {
    const {
      storeName,
      storeTel,
      storeAddress,
      contactName,
      cell_phone,
      telephone,
      mailbox,
      contactAddress,
      licenseImg,
      licenseState,
    } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {this._renderIcon(licenseState)}
          {this._renderItemHeader('企业信息')}
          {this._renderItem('企业名称', storeName)}
          {this._renderItem('企业电话', storeTel)}
          {this._renderItem('企业地址', storeAddress)}
          {this._renderItemHeader('企业联系人信息')}
          {this._renderItem('姓名', contactName)}
          {this._renderItem('电话', cell_phone)}
          {this._renderItem('手机号', telephone)}
          {this._renderItem('邮箱', mailbox)}
          {this._renderItem('地址', contactAddress)}
          {this._renderItemHeader('营业执照')}
          {this._renderAddLicenseImg('上传营业执照', licenseImg)}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    storeName,
    storeTel,
    storeAddress,
    contactName,
    cell_phone,
    telephone,
    mailbox,
    contactAddress,
    licenseImg,
    licenseState,
  } = state.MerchantCA;
  const {token} = state.UserInfo;
  return {
    storeName,
    storeTel,
    storeAddress,
    contactName,
    cell_phone,
    telephone,
    mailbox,
    contactAddress,
    licenseImg,
    token,
    licenseState,
  };
}

export default connect(mapStateToProps)(MerDetail);
