import React from 'react';
import {RNCamera} from 'react-native-camera';
import {View, Easing, Animated, Alert} from 'react-native';

const SCANNER_WIDTH = 200;

import styles from './styles';

export default class MerQRScanner extends React.Component {
  static navigationOptions = {
    title: '二维码',
  };

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.scannerLineMove();
  }

  scannerLineMove = () => {
    this.animatedValue.setValue(4);
    Animated.timing(this.animatedValue, {
      toValue: SCANNER_WIDTH - 4,
      duration: 3500,
      easing: Easing.linear,
    }).start(() => this.scannerLineMove());
  };

  codeRead = result => {
    Alert.alert('二维码内容', result.data, [
      {text: 'OK', onPress: () => console.log('OK')},
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.camera}
          captureAudio={false}
          onBarCodeRead={result => {
            this.codeRead(result);
          }}>
          <View style={styles.scannerBg} />
          <View style={styles.scannerCenter}>
            <View style={styles.scannerBg} />
            <View style={styles.scannerBox}>
              <Animated.View
                style={[
                  styles.scanner,
                  {
                    transform: [{translateY: this.animatedValue}],
                  },
                ]}
              />
              <View style={[styles.boxIcon, styles.boxTopLeft]} />
              <View style={[styles.boxIcon, styles.boxTopRight]} />
              <View style={[styles.boxIcon, styles.boxBottomLeft]} />
              <View style={[styles.boxIcon, styles.boxBottomRight]} />
            </View>
            <View style={styles.scannerBg} />
          </View>
          <View style={styles.scannerBg} />
        </RNCamera>
      </View>
    );
  }
}
