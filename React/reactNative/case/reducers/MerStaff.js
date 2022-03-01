import * as types from '../actions/ActionTypes';

const initialState = {
  all: [],
  allNums: 0,
  allStart: 0,

  check: [],
  checkTotal: 0,
  checkStart: 0,

  audited: [],
  auditedTotal: 0,
  auditedStart: 0,

  pullDropRefresh: false,
  pullUpRefresh: false,

  verifyPopupShow: false,
  userID: '',
  identityValue: '',
  fixDelShow: false,
  showAllCheck:false,

  navTitle: [
    {title: '全部', isCheck: 0},
    {title: '待审核', isCheck: 1},
    {title: '已审核', isCheck: 2},
  ],
  navIndex: 0,
  uncheckPerosnCount:0
};

export default function MerStaff(state = initialState, action) {
  switch (action.type) {
    case types.MER_STAFF_GET_ALL_LIST: {
      if (action.allStart === 0) {
        return Object.assign({}, state, {
          all: action.all,
          allNums: action.allNums,
          allStart: action.all.length,
        });
      }
      if (action.allStart === state.allStart) {
        let commodities = [];
        if (action.allStart === 0) {
          commodities = action.all;
        } else {
          commodities = [...state.all, ...action.all];
        }
        let index = action.allStart + action.all.length;
        return Object.assign({}, state, {
          all: commodities,
          allNums: action.allNums,
          allStart: index,
        });
      } else {
        return state;
      }
    }

    case types.MER_STAFF_GET_CHECK_LIST: {
      if (action.checkStart === 0) {
        return Object.assign({}, state, {
          check: action.check,
          checkTotal: action.checkTotal,
          checkStart: action.check.length,
        });
      }
      if (action.checkStart === state.checkStart) {
        let checkList = [];
        if (action.checkStart === 0) {
          checkList = action.check;
        } else {
          checkList = [...state.check, ...action.check];
        }
        let index = action.checkStart + action.check.length;
        return Object.assign({}, state, {
          check: checkList,
          checkTotal: action.checkTotal,
          checkStart: index,
        });
      } else {
        return state;
      }
    }

    case types.MER_STAFF_GET_AUDITED_LIST: {
      if (action.auditedStart === 0) {
        return Object.assign({}, state, {
          audited: action.audited,
          auditedTotal: action.auditedTotal,
          auditedStart: action.audited.length,
        });
      }
      if (action.auditedStart === state.auditedStart) {
        let auditedList = [];
        if (action.auditedStart === 0) {
          auditedList = action.audited;
        } else {
          auditedList = [...state.audited, ...action.audited];
        }
        let index = action.auditedStart + action.audited.length;
        return Object.assign({}, state, {
          audited: auditedList,
          auditedTotal: action.auditedTotal,
          auditedStart: index,
        });
      } else {
        return state;
      }
    }

    case types.MER_STAFF_PULLDROP_REFRESH:
      return Object.assign({}, state, {
        pullDropRefresh: action.pullDropRefresh,
      });
    case types.MER_STAFF_FIXDEL_SHOW:
      return Object.assign({}, state, {
        fixDelShow: action.fixDelShow,
      });
    case types.MER_STAFF_PULLUP_REFRESH:
      return Object.assign({}, state, {
        pullUpRefresh: action.pullUpRefresh,
      });
    case types.MER_STAFF_IDENTITY_VALUE:
      return Object.assign({}, state, {
        identityValue: action.identityValue,
      });
    case types.MER_STAFF_NAV_INDEX:
      return Object.assign({}, state, {
        navIndex: action.navIndex,
      });
    case types.MER_STAFF_UNCHECK_PERSON:
      return Object.assign({}, state, {
        uncheckPerosnCount: action.uncheckPerosnCount,
      });
    case types.MER_STAFF_SET_All_CHECKBOX:
      return Object.assign({}, state, {
        all: action.all,
      });
    case types.MER_STAFF_SET_WAIT_CHECKBOX:
      return Object.assign({}, state, {
        check: action.check,
      });
    case types.MER_STAFF_SET_FINSH_CHECKBOX:
      return Object.assign({}, state, {
        audited: action.audited,
      });
    case types.MER_STAFF_SET_CHECKBOX_ALL:
      return Object.assign({}, state, {
        showAllCheck: action.showAllCheck,
      });
    case types.MER_STAFF_VERIFY_POPUP_SHOW:
      return Object.assign({}, state, {
        verifyPopupShow: action.verifyPopupShow,
        userID: action.userID,
      });
    case types.MER_STAFF_CLEAR:
      return initialState;
    default:
      return state;
  }
}
