import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../constant/color';
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  layout: {
    margin: 10,
    flex: 1,
  },
  layoutaddress: {
    flex: 1,
  },
  wrapaddress: {
    margin: 10,
  },
  mr10: {
    marginRight: 10,
  },
  pl10: {
    paddingLeft: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  textInput: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: 10,
    fontSize: 14,
  },
  clearBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  clearimg: {
    width: 16,
    height: 16,
  },
  tips: {
    color: '#F15A24',
    fontSize: 10,
    height: 40,
    lineHeight: 40,
  },
  layouttel: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 48,
  },
  inputlist: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    justifyContent: 'space-between',
  },
  oldphone: {
    height: 50,
    lineHeight: 50,
    fontSize: 16,
    flexDirection: 'row',
    width: '100%',
    color: '#999',
    borderBottomColor: Colors.bgeee,
    borderBottomWidth: 0.5,
  },
  smsCodeBox: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smsCodeInput: {
    flex: 1,
    height: 48,
    padding: 0,
  },
  nextBtn: {
    margin: 0,
  },
  inputheight200: {
    height: 200,
    backgroundColor: Colors.surface,
    textAlignVertical: 'top',
  },
  addresslist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.surface,
    paddingLeft: 10,
    paddingRight: 10,
  },
  borderbottom: {
    borderBottomColor: Colors.bgeee,
    borderBottomWidth: 0.5,
  },
  nextwrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nexticon: {
    width: 16,
    height: 16,
  },
  inputaddress: {
    maxWidth: 200,
    alignItems: 'center',
    height: 80,
    textAlign: 'right',
  },
  addresstext: {
    fontSize: 14,
    color: Colors.bg666,
    width: WIDTH - 104,
    textAlign: 'right',
  },
});

export default styles;
