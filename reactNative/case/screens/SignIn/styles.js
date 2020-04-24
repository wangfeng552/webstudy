import {StyleSheet} from 'react-native';
import Color from '../../constant/color';
import {STATUSBAR_HEIGHT} from '../../utils/devices';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.surface,
  },
  closeBtn: {
    marginTop: STATUSBAR_HEIGHT,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  topContainer: {
    marginTop: 8,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  signInText: {
    fontSize: 24,
    color: Color.title,
    textAlignVertical: 'center',
  },
  registerBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: Color.title,
  },
  nextIcon: {
    width: 7,
    height: 14,
    marginLeft: 4,
    tintColor: Color.title,
  },
  phoneInput: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  authBox: {
    height: 48,
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authInput: {
    flex: 1,
    height: 48,
    padding: 0,
  },
  line: {
    width: 1,
    height: 24,
    backgroundColor: Color.border,
  },
  forgetBox: {
    justifyContent: 'center',
    height: 48,
    width: 84,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.border,
    marginLeft: -1,
  },
  forgetText: {
    fontSize: 14,
    color: Color.text,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Color.border,
  },
  loginBtn: {
    marginTop: 48,
    marginHorizontal: 16,
  },
  rightBox: {
    height: 56,
    justifyContent: 'center',
    marginRight: 16,
    alignSelf: 'flex-end',
  },
  otherVerifyType: {
    fontSize: 14,
    color: Color.primary,
  },
  protocolContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    marginTop: 40,
    bottom: 16,
  },
  protocolText: {
    color: '#999999',
    fontSize: 12,
  },
  protocolName: {
    color: Color.primary,
    fontSize: 12,
    opacity: 0.5,
  },
});

export default styles;
