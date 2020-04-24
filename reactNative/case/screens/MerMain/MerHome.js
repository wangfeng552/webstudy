import React from 'react';
import {View, Text, SectionList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {NavigationEvents} from 'react-navigation';
import {getHomeInfo, clearHomeInfo} from '../../actions/MerHome';

import styles from './styles';

const avatar = require('../../images/ic_avatar.png');
const qrs = require('../../images/ic_qrs.png');
const qr = require('../../images/ic_qr.png');
const icHomeS = require('../../images/ic_home_s.png');
const icHomeH = require('../../images/ic_home_h.png');

class Item extends React.Component {
  render() {
    let number = this.props.number ? this.props.number.toString() : '0';
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title24}>{number}</Text>
        <Text style={styles.subItem}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

class MerHome extends React.Component {
  static navigationOptions = {
    title: '首页',
    tabBarIcon: ({focused}) => {
      if (focused) {
        return <Image style={styles.tabBarIcon} source={icHomeS} />;
      }
      return <Image style={styles.tabBarIcon} source={icHomeH} />;
    },
  };
  componentDidMount() {
    this.props.dispatch(getHomeInfo());
  }

  componentWillUnmount() {
    this.props.dispatch(clearHomeInfo());
  }

  _renderListHeader = () => {
    return (
      <View>
        {this._renderHeadPart()}
        {this._renderTipsPart()}
      </View>
    );
  };
  _renderHeadPart = () => {
    const {info, navigation} = this.props;
    return (
      <View style={styles.header}>
        <View style={styles.headImgBox}>
          <Image style={styles.headImg} source={avatar} />
          <Text style={styles.nick}>{info.nick}</Text>
        </View>
        <View style={styles.scanBox}>
          <TouchableOpacity style={styles.scanBtn} onPress={() => {
              navigation.navigate('MerQRScanner');
            }}>
            <Image style={styles.scanImg} source={qrs} />
            <Text style={styles.nick}>扫码</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.scanBtn}
            onPress={() => {
              // navigation.navigate('MerCouponRecycle');
              navigation.navigate('MerCollectMoney');
            }}>
            <Image style={styles.scanImg} source={qr} />
            <Text style={styles.nick}>收款码</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderTipsPart = () => {
    const {info} = this.props;
    return (
      <View style={styles.tipsPart}>
        <View style={styles.tipBox2}>
          <Item number={info.coupon} title={'今日券码核销'} />
          <Item number={info.couponTotal} title={'核销总数'} />
        </View>
        <View style={styles.tipBox}>
          <Item number={info.coupon} title={'今日积分核销'} />
          <Item number={info.couponTotal} title={'积分总数'} />
        </View>
      </View>
    );
  };

  renderItem = ({item, index}) => {
    return (
      <View style={styles.itemPart}>
        <View style={styles.itemBox}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.itemBox}>
          <Text style={styles.text}>有效期：{item.time}</Text>
          <Text style={styles.text}>ID:{item.id}</Text>
        </View>
        <View style={styles.itemBox}>
          <Text style={styles.text}>使用日期：{item.useTime}</Text>
        </View>
      </View>
    );
  };

  _renderSectionHeader({section}) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
    );
  }

  itemLine() {
    return <View />;
  }

  render() {
    const {info, dispatch} = this.props;
    let data = info.data && info.data.length > 0 ? info.data : [];
    return (
      <View style={styles.container}>
        <SectionList
          sections={data}
          ListHeaderComponent={this._renderListHeader}
          renderItem={this.renderItem}
          renderSectionHeader={this._renderSectionHeader}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.itemLine}
        />
        <NavigationEvents
          onWillFocus={() => {
            dispatch(getHomeInfo());
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {info} = state.MerHome;

  return {
    info,
  };
}

export default connect(mapStateToProps)(MerHome);
