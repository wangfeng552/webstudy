import {Platform, StatusBar, Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// import {
//   android as androirVersion,
//   ios as iosVersion,
// } from '../../constant/version';

const {width, height} = Dimensions.get('window');

const APPBAR_HEIGHT = getAppBarHeight();
const TOOLBAR_HEIGHT = getToolBarHeight();
const STATUSBAR_HEIGHT = getStatusBarHeight();
const SAFEAREA_BOTTOM = getSafeareaBootom();
const VERSION_CODE = getVersionCode();
const PLATFORM_OS = getPlatform();

function getStatusBarHeight() {
  if (Platform.OS === 'ios') {
    if (DeviceInfo.hasNotch()) {
      return 40;
    } else {
      return 20;
    }
  }
  return StatusBar.currentHeight;
}

function getToolBarHeight() {
  if (Platform.OS === 'ios') {
    return 44;
  }
  return 56;
}

function getAppBarHeight() {
  if (Platform.OS === 'ios') {
    if (DeviceInfo.hasNotch()) {
      return 84;
    } else {
      return 64;
    }
  }
  return StatusBar.currentHeight + 56;
}

function getSafeareaBootom() {
  if (Platform.OS === 'ios' && DeviceInfo.hasNotch()) {
    return 34;
  }
  return 0;
}

function getVersionCode() {
  // if (Platform.OS === 'ios') {
  //   return iosVersion.versionCode;
  // } else if (Platform.OS === 'android') {
  //   return androirVersion.versionCode;
  // } else {
  //   return 0;
  // }
}

function getPlatform() {
  return Platform.OS;
}

module.exports = {
  APPBAR_HEIGHT,
  TOOLBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SAFEAREA_BOTTOM,
  VERSION_CODE,
  PLATFORM_OS,
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
};
