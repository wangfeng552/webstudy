import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
const checkimg = require('../../images/ic_checked.png');
const uncheckimg = require('../../images/ic_check_gray.png');
import Button from '../../components/Button';
import {deletePersonArr, setCheckBox,showAllCheckSelect} from '../../actions/MerStaff';
import Toast from '../../utils/Toast';

class FixDel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllCheck: false,
    };
  }
  deletePerson = () => {
    const {dispatch, all, check, audited, navIndex, token} = this.props;
    let filterAllSelect = [];
    let filterAllSelectID = [];
    let filterCheckSelect = [];
    let filterCheckSelectID = [];
    let filterAuditedSelect = [];
    let filterAuditedSelectID = [];
    if (navIndex === 0) {
      filterAllSelect = all.filter(v => {
        return v.isChecked === true;
      });
      filterAllSelectID = filterAllSelect.map(item => {
        return item.id;
      });
      if (filterAllSelectID.length === 0) {
        Toast.show('请先选择后再删除');
        return;
      }
      this._sureDeletePerson(filterAllSelectID, navIndex, token);
    } else if (navIndex === 1) {
      filterCheckSelect = check.filter(v => {
        return v.isChecked === true;
      });
      filterCheckSelectID = filterCheckSelect.map(item => {
        return item.id;
      });
      if (filterCheckSelectID.length === 0) {
        Toast.show('请先选择后再删除');
        return;
      }
      this._sureDeletePerson(filterCheckSelectID, navIndex, token);
    } else {
      filterAuditedSelect = audited.filter(v => {
        return v.isChecked === true;
      });
      filterAuditedSelectID = filterAuditedSelect.map(item => {
        return item.id;
      });
      if (filterAuditedSelectID.length === 0) {
        Toast.show('请先选择后再删除');
        return;
      }
      this._sureDeletePerson(filterAuditedSelectID, navIndex, token);
    }
  };
  _sureDeletePerson = (id, navIndex, token) => {
    const {dispatch} = this.props;
    Alert.alert(
      '',
      '确认删除员工？',
      [
        {text: '取消'},
        {
          text: '确认',
          onPress: () => {
            dispatch(deletePersonArr(id, navIndex, token));
          },
        },
      ],
      {cancelable: false},
    );
  };

  checkAllPerson = () => {
    const {dispatch, navIndex, all, check, audited} = this.props;
    if (navIndex === 0) {
      let allList = all.concat();
      let isSelectedAll = true;
      allList.map(commodity => {
        if (!commodity.isChecked) {
          isSelectedAll = false;
        }
      });
      if (isSelectedAll) {
        allList.map(commodity => {
          commodity.isChecked = false;
        });
        dispatch(showAllCheckSelect(false))
      } else {
        allList.map(commodity => {
          commodity.isChecked = true;
        });
        dispatch(showAllCheckSelect(true))
      }
      dispatch(setCheckBox(allList, navIndex));
    } else if (navIndex === 1) {
      let allCheck = check.concat();
      let isSelectedAll = true;
      allCheck.map(commodity => {
        if (!commodity.isChecked) {
          isSelectedAll = false;
        }
      });
      if (isSelectedAll) {
        allCheck.map(commodity => {
          commodity.isChecked = false;
        });
        dispatch(showAllCheckSelect(false))
      } else {
        allCheck.map(commodity => {
          commodity.isChecked = true;
        });
        dispatch(showAllCheckSelect(true))
      }
      dispatch(setCheckBox(allCheck, navIndex));
    } else {
      let auditedCheck = audited.concat();
      let isSelectedAll = true;
      auditedCheck.map(commodity => {
        if (!commodity.isChecked) {
          isSelectedAll = false;
        }
      });
      if (isSelectedAll) {
        auditedCheck.map(commodity => {
          commodity.isChecked = false;
        });
        dispatch(showAllCheckSelect(false))
      } else {
        auditedCheck.map(commodity => {
          commodity.isChecked = true;
        });
        dispatch(showAllCheckSelect(true))
      }
      dispatch(setCheckBox(auditedCheck, navIndex));
    }
  };
  _renderCheckAll = () => {
    const {showAllCheck} = this.props;
    if (showAllCheck) {
      return <ImageBackground source={checkimg} style={styles.checkimgall} />;
    }
    return <ImageBackground source={uncheckimg} style={styles.checkimgall} />;
  };

  render() {
    const {fixDelShow} = this.props;
    if (!fixDelShow) {
      return <View />;
    }
    return (
      <View style={styles.fixdel}>
        <View style={styles.delwrap}>
          <TouchableOpacity
            style={styles.checkleft}
            onPress={this.checkAllPerson}>
            {this._renderCheckAll()}
            <Text>全选</Text>
          </TouchableOpacity>
          <Button
            value="删除"
            style={styles.btndelete}
            onPress={this.deletePerson}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    all,
    check,
    audited,

    pullDropRefresh,
    pullUpRefresh,
    verifyPopupShow,
    identityValue,
    fixDelShow,
    navIndex,
    showAllCheck,
  } = state.MerStaff;
  const {token} = state.UserInfo;
  return {
    all,
    check,
    audited,
    pullUpRefresh,
    pullDropRefresh,
    verifyPopupShow,
    token,
    identityValue,
    fixDelShow,
    navIndex,
    showAllCheck,
  };
}

export default connect(mapStateToProps)(FixDel);
