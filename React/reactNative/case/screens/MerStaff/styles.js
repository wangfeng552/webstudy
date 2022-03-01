import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  emptyBox: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#333333',
    fontSize: 14,
  },
  navRightBtn: {
    color: '#f00',
    fontSize: 12,
    marginRight: 10,
    height: 50,
    width: 50,
    lineHeight: 50,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  footContainer: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footBorder: {
    flex: 1,
    height: 0.5,
    marginHorizontal: 16,
    backgroundColor: '#333333',
  },
  fontText: {
    fontSize: 14,
    color: '#333333',
  },
  itemBox: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderTopWidth: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    height: 64,
  },
  checkimgbtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkimg: {
    width: 12,
    height: 12,
  },
  leftBox: {
    flexDirection: 'row',
    marginLeft: 16,
    alignItems: 'center',
    height: 42,
  },
  headImg: {
    width: 42,
    height: 42,
    marginRight: 16,
    backgroundColor: '#ccc',
  },
  titleBox: {
    justifyContent: 'space-around',
    height: 42,
  },
  title: {
    fontSize: 14,
    color: '#333333',
  },
  subTitle: {
    fontSize: 12,
    color: '#999999',
  },
  clickBtn: {
    backgroundColor: '#ff0000',
    width: 64,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderRadius: 14,
  },
  typeBox: {
    width: 64,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cccccc',
    marginRight: 16,
    borderRadius: 14,
  },
  typeSuccess: {
    width: 64,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginRight: 16,
    borderRadius: 14,
  },
  typeTitle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  modalBackgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  innerContainerPopup: {
    borderRadius: 10,
    // alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    position: 'relative',
  },
  closePopup: {
    width: 36,
    height: 36,
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeimg: {
    width: 15,
    height: 15,
  },
  checkinput: {
    width: '100%',
    backgroundColor: '#F7F8F9',
    padding: 5,
    marginBottom: 15,
  },
  checktitle: {
    height: 40,
  },
  btnPopupWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textcancel: {
    height: 40,
    lineHeight: 40,
    width: 100,
    textAlign: 'center',
  },
  textsure: {
    color: '#FE0000',
    height: 40,
    lineHeight: 40,
    width: 100,
    textAlign: 'center',
  },
  fixdel: {
    right: 0,
    left: 0,
    height: 50,
    position: 'absolute',
    bottom: 0,
    borderTopColor: '#efefef',
    borderTopWidth: 0.5,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  delwrap: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkimgall: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  checkleft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btndelete: {
    width: 80,
    height: 30,
    fontSize: 12,
  },

  // 新版
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  pstitle:{
    position:'relative',
  },
  actnavtitle: {
    color: '#f00',
    borderBottomColor: '#f00',
    borderBottomWidth: 1,
    height: 49,
    lineHeight: 49,
  },
  dftitle:{
    height: 49,
    lineHeight: 49,
  },
  personwrap: {
    paddingHorizontal: 8,
  },
  fixtop: {
    backgroundColor: '#f60',
  },
  titlelist: {
    width: '33%',
  },
  fixperson:{
    position:'absolute',
    left:40,
    top:10,
    zIndex:10,
    minWidth:16,
    height:16,
    borderRadius:8,
    backgroundColor:'#f00',
    lineHeight:16,
  },
  tit03:{
    color:'#fff',
    fontSize:10,
    minWidth:16,
    textAlign:"center",
  }
});

export default styles;
