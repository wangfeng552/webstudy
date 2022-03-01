import React from 'react';
import {View, Text, SectionList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getMerchantInfo, getMemberGroupTaskCount} from '../../actions/MerMine';
import Toast from '../../utils/Toast';
import {NavigationEvents} from 'react-navigation';

import styles from './styles';

const avatar = require('../../images/ic_avatar.png');
const nextIcon = require('../../images/ic_next_mer.png');
const icMyS = require('../../images/ic_my_s.png');
const icMyH = require('../../images/ic_my_h.png');

class MerMine extends React.Component {
  static navigationOptions = {
    title: '我的',
    tabBarIcon: ({focused}) => {
      if (focused) {
        return <Image style={styles.tabBarIcon} source={icMyS} />;
      }
      return <Image style={styles.tabBarIcon} source={icMyH} />;
    },
  };

  componentDidMount() {
    const {dispatch, token} = this.props;
    dispatch(getMerchantInfo(token));
    this.getUncheckPerson();
  }

  targetFunction() {
    const {dispatch, token} = this.props;
    dispatch(getMerchantInfo(token));
    this.getUncheckPerson();
  }

  getUncheckPerson = () => {
    const {info, dispatch, token} = this.props;
    let licenseState = info.isAuthentication;
    if (
      licenseState === 'creat' ||
      licenseState === 'submit' ||
      licenseState === 'failure'
    ) {
      return;
    }
    dispatch(getMemberGroupTaskCount('unchecked', token));
  };

  _renderShopIcon = () => {
    const {info} = this.props;
    if (!info.imgIcon) {
      return <Image style={styles.headImage} source={avatar} />;
    }
    return <Image style={styles.headImage} source={{uri: info.imgIcon}} />;
  };

  _renderListHeader = () => {
    const {info} = this.props;
    let shopName = info.shopName.length > 0 ? info.shopName : '';
    return (
      <View style={styles.header}>
        {this._renderShopIcon()}
        <Text style={styles.shopName}>{shopName}</Text>
        <Text style={styles.shopID}>店铺ID：{info.shopId}</Text>
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

  _renderItemTitle = (image, title) => {
    return (
      <View style={styles.sectionItem}>
        <Image style={styles.sectionItemImage} source={image} />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  _renderItemStaff = staffNo => {
    return (
      <View style={styles.sectionItem}>
        {staffNo > 99 ? (
          <View style={styles.staffBoxMax}>
            <Text style={styles.staffNo}>99+</Text>
          </View>
        ) : (
          <View style={styles.staffBox}>
            <Text style={styles.staffNo}>{staffNo.toString()}</Text>
          </View>
        )}
        <Image style={styles.nextIcon} source={nextIcon} />
      </View>
    );
  };

  _renderItemNextIcon = title => {
    return (
      <View style={styles.sectionItem}>
        <Text style={styles.subtitle}>{title}</Text>
        <Image style={styles.nextIcon} source={nextIcon} />
      </View>
    );
  };

  _renderItem = ({item, index, section}) => {
    const {info, uncheckPersonCount} = this.props;
    let licenseState = info.isAuthentication;
    let title = '';
    if (item.tit === '商户认证') {
      if (licenseState === 'create') {
        title = '未认证';
      } else if (licenseState === 'submit') {
        title = '认证中';
      } else if (licenseState === 'success') {
        title = '已认证';
      } else if (licenseState === 'failure') {
        title = '未通过';
      } else if (licenseState === 'update') {
        title = '更新中';
      } else if (licenseState === 'update_failure') {
        title = '更新失败';
      }
    }
    return (
      <TouchableOpacity
        style={styles.section}
        key={index}
        onPress={() => {
          this._pressItem(item.tit);
        }}>
        {this._renderItemTitle(item.img, item.tit)}
        {item.tit === '员工管理' && uncheckPersonCount !== 0
          ? this._renderItemStaff(uncheckPersonCount)
          : this._renderItemNextIcon(title)}
      </TouchableOpacity>
    );
  };

  _pressItem = title => {
    const {navigation, info} = this.props;
    let licenseState = info.isAuthentication;
    switch (title) {
      case '商铺信息':
        if (
          licenseState === 'creat' ||
          licenseState === 'submit' ||
          licenseState === 'failure'
        ) {
          Toast.show('请先认证商户');
          return;
        }
        navigation.navigate('MerShopInfo');
        break;
      case '员工管理':
        if (
          licenseState === 'creat' ||
          licenseState === 'submit' ||
          licenseState === 'failure'
        ) {
          Toast.show('请先认证商户');
          return;
        }
        navigation.navigate('MerStaff');
        break;
      case '积分管理':
        navigation.navigate('MerPointDetail');
        break;
      case '消息':
        navigation.navigate('MerInformation');
        break;
      case '安全设置':
        navigation.navigate('SafeSetting');
        break;
      case '商户认证':
        if (licenseState === 'create') {
          navigation.navigate('MerchantCA');
        } else {
          navigation.navigate('MerDetail');
        }
        break;
      default:
        break;
    }
  };

  itemLine() {
    return <View style={styles.separatorL} />;
  }

  render() {
    const {sections, info} = this.props;
    let extraData = info;
    return (
      <View style={styles.container}>
        <SectionList
          style={styles.container}
          renderItem={this._renderItem}
          sections={sections}
          ItemSeparatorComponent={this.itemLine}
          renderSectionHeader={this._renderSectionHeader}
          keyExtractor={item => item.tit}
          ListHeaderComponent={this._renderListHeader}
          extraData={extraData}
        />
        <NavigationEvents onDidFocus={() => this.targetFunction()} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {sections, info, uncheckPersonCount} = state.MerMine;
  const {token} = state.UserInfo;

  return {
    sections,
    info,
    token,
    uncheckPersonCount,
  };
}

export default connect(mapStateToProps)(MerMine);
