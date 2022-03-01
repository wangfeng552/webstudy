import {StyleSheet} from 'react-native';
import Color from '../../constant/color';

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.border,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    height: 40,
    alignSelf: 'center',
    padding: 0,
  },
  iconBox: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {width: 16, height: 8},
});

export default styles;
