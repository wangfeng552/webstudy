import Toast from 'react-native-root-toast';
import {ToastAndroid, Platform} from 'react-native';

const show = message => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  } else {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      animation: true,
    });
  }
};

module.exports = {
  show,
};
