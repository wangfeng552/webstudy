import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  changeAddressName,
  setShopAddressArea,
  setAddressCode,
  saveCompanyAddress,
  getDianpuInfo,
} from '../../actions/MerEditShop';
import CityPicker from '../../components/CityPicker';

const jiantou = require('../../images/ic_next_mer.png');

class EditShopAddress extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '地址修改',
    headerRight: () => (
      <Text
        style={styles.navRightBtn}
        onPress={() => {
          navigation.state.params.navigatePress();
        }}>
        保存
      </Text>
    ),
  });

  componentDidMount() {
    const {dispatch, token} = this.props;
    this.props.navigation.setParams({
      navigatePress: this.saveAddress,
    });
    dispatch(getDianpuInfo(token));
  }

  saveAddress = () => {
    const {dispatch, addressCode, addressName, token} = this.props;
    dispatch(saveCompanyAddress(addressCode, addressName, token));
  };

  changeAddressName = addressName => {
    const {dispatch} = this.props;
    dispatch(changeAddressName(addressName));
  };

  onPickCity = () => {
    Keyboard.dismiss();
    this.cityPick.showCityPick();
  };

  onSelectCity = address => {
    if (address && address.townCode && address.townCode !== 0) {
      console.log('==>==>', address);
      let str =
        address.provinceName +
        address.cityName +
        address.countyName +
        address.townName;
      this.props.dispatch(setShopAddressArea(str));
      this.props.dispatch(setAddressCode(address));
    }
  };

  _renderCityPicker = () => (
    <CityPicker
      ref={ref => {
        this.cityPick = ref;
      }}
      onSelected={this.onSelectCity}
      show={false}
    />
  );

  render() {
    const {addressName, shopAddress} = this.props;
    let address = shopAddress.length > 0 ? shopAddress : '请选择商铺地址';
    return (
      <View style={styles.layoutaddress}>
        <View style={styles.wrapaddress}>
          <View style={[styles.addresslist, styles.borderbottom]}>
            <Text>地区</Text>
            <TouchableOpacity
              style={styles.nextwrap}
              onPress={() => {
                this.onPickCity();
              }}>
              <Text style={styles.addresstext} numberOfLines={2}>
                {address}
              </Text>
              <Image source={jiantou} style={styles.nexticon} />
            </TouchableOpacity>
          </View>
          <View style={styles.addresslist}>
            <Text>详细地址</Text>
            <TextInput
              style={styles.inputaddress}
              onChangeText={this.changeAddressName}
              multiline={true}
              value={addressName}
              placeholder="请输入详细地址"
            />
          </View>
        </View>
        {this._renderCityPicker()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {addressName, shopAddress, addressCode} = state.MerEditShop;
  const {token} = state.UserInfo;

  return {
    addressName,
    shopAddress,
    addressCode,
    token,
  };
}

export default connect(mapStateToProps)(EditShopAddress);
