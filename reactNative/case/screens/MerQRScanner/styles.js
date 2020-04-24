import {StyleSheet} from 'react-native';

const SCANNER_WIDTH = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  scannerBg: {
    flex: 1,
    backgroundColor: '#0000004D',
  },
  scannerCenter: {
    width: '100%',
    height: SCANNER_WIDTH,
    flexDirection: 'row',
  },
  scannerBox: {
    width: SCANNER_WIDTH,
    height: SCANNER_WIDTH,
  },
  scanner: {
    marginLeft: 4,
    marginRight: 4,
    height: 1,
    backgroundColor: '#22ff00',
    width: 192,
  },
  boxIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#22ff00',
  },
  boxTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  boxTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  boxBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  boxBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
});

export default styles;
