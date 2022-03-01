import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles';
import QRCode from 'react-native-zoomatec-qrcode-svg';

export default class MerCollectMoney extends Component {
  static navigationOptions = {
    title: '收款码',
  };

  _renderQRCode = () => {
    let couponSn = 'http://awesome.link.qr';
    return <QRCode value={couponSn} size={200} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fkwrap}>
        <Text style={styles.title}> 扫一扫 向我付款 </Text>
        <View style={styles.qrcode}>
          {this._renderQRCode()}
        </View>
        <TouchableOpacity style={styles.btnshuaxin}>
          <Text style={styles.blue}>点此刷新</Text>
        </TouchableOpacity>

        </View>

       
      </View>
    )
  }
}
