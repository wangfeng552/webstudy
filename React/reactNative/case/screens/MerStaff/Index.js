import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {
  setNavIndex,
  showFixDel,
  getStaffInfo,
  clearStaffInfo,
  setCheckBox,
  showAllCheckSelect,
  getUncheckPersonCount,
} from '../../actions/MerStaff';
import PopupStaff from './PopupStaff';
import FixDel from './FixDel';
import Item from './Item';
import Foot from './Foot';
import Toast from '../../utils/Toast';

class Index extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '员工管理',
    headerRight: a => (
      <Text
        style={styles.navRightBtn}
        onPress={() => {
          navigation.state.params.navigatePress();
        }}>
        编辑
      </Text>
    ),
  });

  constructor(props) {
    super(props);
    this.pageState = 'all';
  }

  componentDidMount() {
    const {navigation, dispatch, token, fixDelShow} = this.props;
    navigation.setParams({
      navigatePress: this.editPerson,
    });
    dispatch(getStaffInfo('all', 0, token, fixDelShow));
    dispatch(getUncheckPersonCount('unchecked', token));
  }

  getPersonList = index => {
    const {dispatch, token, fixDelShow} = this.props;
    if (index === 0) {
      this.pageState = 'all';
    } else if (index === 1) {
      this.pageState = 'unchecked';
    } else {
      this.pageState = 'checked';
    }
    dispatch(getStaffInfo(this.pageState, 0, token, fixDelShow));
  };

  componentWillUnmount() {
    this.props.dispatch(clearStaffInfo());
  }

  editPerson = () => {
    const {dispatch, fixDelShow, navIndex, all, check, audited} = this.props;
    dispatch(showFixDel(!fixDelShow));
    if (this.pageState === 'all') {
      all.forEach(v => {
        if (!fixDelShow) {
          v.isShow = true;
        } else {
          v.isShow = false;
        }
      });
      dispatch(setCheckBox(all, navIndex));
    } else if (this.pageState === 'unchecked') {
      check.forEach(v => {
        if (!fixDelShow) {
          v.isShow = true;
        } else {
          v.isShow = false;
        }
      });
      dispatch(setCheckBox(check, navIndex));
    } else {
      audited.forEach(v => {
        if (!fixDelShow) {
          v.isShow = true;
        } else {
          v.isShow = false;
        }
      });
      dispatch(setCheckBox(audited, navIndex));
    }
  };

  changTab = index => {
    const {dispatch, fixDelShow} = this.props;
    if (fixDelShow) {
      Toast.show('请先保存编辑在切换');
      return;
    }
    dispatch(setNavIndex(index));
    this.getPersonList(index);
  };

  _renderUncheckPerson = () => {
    const {uncheckPerosnCount} = this.props;
    if (uncheckPerosnCount === 0) {
      return <View />;
    }
    return (
      <View style={styles.fixperson}>
        <Text style={styles.tit03}>
          {uncheckPerosnCount > 99 ? '99+' : uncheckPerosnCount}
        </Text>
      </View>
    );
  };

  _renderNavTitle = () => {
    const {navTitle, navIndex} = this.props;
    return (
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => this.changTab(0)}>
          <Text style={navIndex === 0 ? styles.actnavtitle : styles.dftitle}>
            {navTitle[0].title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changTab(1)} style={styles.pstitle}>
          <Text style={navIndex === 1 ? styles.actnavtitle : styles.dftitle}>
            {navTitle[1].title}
          </Text>
          {this._renderUncheckPerson()}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changTab(2)}>
          <Text style={navIndex === 2 ? styles.actnavtitle : styles.dftitle}>
            {navTitle[2].title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderEmpty = type => {
    if (!type) {
      return (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>暂无员工</Text>
        </View>
      );
    }
    return null;
  };

  _renderFoot = () => {
    const {
      pullUpRefresh,
      allStart,
      allNums,
      checkTotal,
      checkStart,
      auditedTotal,
      auditedStart,
      navIndex,
    } = this.props;
    if (navIndex === 0) {
      if (allStart !== 0 && allNums === allStart) {
        return <Foot />;
      }
    }
    if (navIndex === 1) {
      if (checkStart !== 0 && checkTotal === checkStart) {
        return <Foot />;
      }
    }
    if (navIndex === 2) {
      if (auditedStart !== 0 && auditedTotal === auditedStart) {
        return <Foot />;
      }
    }
    if (pullUpRefresh) {
      return (
        <View style={styles.footContainer}>
          <ActivityIndicator
            style={styles.footIndicator}
            animating
            size="large"
            color={'#ff0000'}
          />
          <Text style={styles.footText}>正在加载，请稍后！</Text>
        </View>
      );
    }
    return null;
  };

  // 滚动到离底部0.1的时候调用
  onEndReached = () => {
    const {
      allStart,
      allNums,
      token,
      checkTotal,
      checkStart,
      auditedTotal,
      auditedStart,
      fixDelShow,
    } = this.props;

    if (this.pageState === 'all') {
      if (allStart === 0 || allStart !== allNums) {
        this.props.dispatch(
          getStaffInfo(this.pageState, allStart, token, fixDelShow),
        );
      }
    } else if (this.pageState === 'unchecked') {
      if (checkStart === 0 || checkStart !== checkTotal) {
        this.props.dispatch(
          getStaffInfo(this.pageState, checkStart, token, fixDelShow),
        );
      }
    } else {
      if (auditedStart === 0 || auditedStart !== auditedTotal) {
        this.props.dispatch(
          getStaffInfo(this.pageState, auditedStart, token, fixDelShow),
        );
      }
    }
  };

  _checkPerson = (item, isChecked, index) => {
    const {all, check, audited, dispatch, navIndex} = this.props;
    let newAllList = all.concat();
    let newCheckList = check.concat();
    let newAuditedList = audited.concat();
    if (navIndex === 0) {
      newAllList[index].isChecked = isChecked;
      let allIsCheck = newAllList.every(v => {
        return v.isChecked === true;
      });
      dispatch(showAllCheckSelect(allIsCheck));
      dispatch(setCheckBox(newAllList, navIndex));
    } else if (navIndex === 1) {
      newCheckList[index].isChecked = isChecked;
      let checkIsCheck = newCheckList.every(v => {
        return v.isChecked === true;
      });
      dispatch(showAllCheckSelect(checkIsCheck));
      dispatch(setCheckBox(newCheckList, navIndex));
    } else {
      newAuditedList[index].isChecked = isChecked;
      let AuditedIsCheck = newAuditedList.every(v => {
        return v.isChecked === true;
      });
      dispatch(showAllCheckSelect(AuditedIsCheck));
      dispatch(setCheckBox(newAuditedList, navIndex));
    }
  };

  _renderItem = ({item, index}) => (
    <Item
      checkPerson={this._checkPerson}
      index={index}
      item={item}
      dispatch={this.props.dispatch}
    />
  );

  _renderPerson = () => {
    const {
      all,
      allStart,
      allNums,
      check,
      checkTotal,
      checkStart,
      audited,
      auditedTotal,
      auditedStart,
      pullDropRefresh,
      pullUpRefreshing,
      navIndex,
    } = this.props;
    let extraData = {
      pullUpRefreshing,
      allStart,
      allNums,
      all,
      check,
      checkTotal,
      checkStart,
      audited,
      auditedTotal,
      auditedStart,
    };
    if (navIndex === 0) {
      return (
        <View style={styles.personwrap}>
          <FlatList
            data={all}
            renderItem={this._renderItem}
            ListEmptyComponent={this._renderEmpty(pullDropRefresh)}
            ListFooterComponent={this._renderFoot}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.1}
            extraData={extraData}
          />
        </View>
      );
    }
    if (navIndex === 1) {
      return (
        <View style={styles.personwrap}>
          <FlatList
            data={check}
            renderItem={this._renderItem}
            ListEmptyComponent={this._renderEmpty(pullDropRefresh)}
            ListFooterComponent={this._renderFoot}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.1}
            extraData={extraData}
          />
        </View>
      );
    }
    return (
      <View style={styles.personwrap}>
        <FlatList
          data={audited}
          renderItem={this._renderItem}
          ListEmptyComponent={this._renderEmpty(pullDropRefresh)}
          ListFooterComponent={this._renderFoot}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          extraData={extraData}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <PopupStaff pageState={this.pageState} />
        {this._renderNavTitle()}
        {this._renderPerson()}
        <FixDel />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    all,
    allNums,
    allStart,

    check,
    checkTotal,
    checkStart,

    audited,
    auditedTotal,
    auditedStart,

    pullDropRefresh,
    pullUpRefresh,
    verifyPopupShow,
    userID,
    navTitle,
    navIndex,
    fixDelShow,
    uncheckPerosnCount,
  } = state.MerStaff;
  const {token} = state.UserInfo;
  return {
    all,
    allNums,
    allStart,
    check,
    checkTotal,
    checkStart,
    audited,
    auditedTotal,
    auditedStart,
    pullUpRefresh,
    pullDropRefresh,
    verifyPopupShow,
    userID,
    token,
    navTitle,
    navIndex,
    fixDelShow,
    uncheckPerosnCount,
  };
}

export default connect(mapStateToProps)(Index);
