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
    alignSelf: 'center',
    padding: 0,
    fontSize: 14,
    color: Color.text,
  },
  clearBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export default styles;
