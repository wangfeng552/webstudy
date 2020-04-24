import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  inputName,
  clearCompany,
  setCompanyName,
} from '../../actions/MerEditShop';

const clearImg = require('../../images/ic_clear1.png');

class EditShopName extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '商铺名',
    headerRight: () => (
      <Text
        style={styles.navRightBtn}
        onPress={() => {
          navigation.state.params.navigatePress();
        }}>
        保存
      </Text>
    ),
  });

  componentDidMount() {
    // let name = this.props.navigation.state.params.name;
    this.props.navigation.setParams({
      navigatePress: this.saveShopName,
    });
    this.inputName(this.props.navigation.state.params.name);
  }

  saveShopName = () => {
    const {dispatch, name, token, navigation} = this.props;
    dispatch(setCompanyName(name, token, navigation));
  };

  inputName = name => {
    const {dispatch} = this.props;
    dispatch(inputName(name));
  };

  clearCompany = () => {
    const {dispatch} = this.props;
    dispatch(clearCompany());
  };

  _renderClear = () => {
    const {name} = this.props;
    if (name && name.length > 0) {
      return (
        <TouchableOpacity style={styles.clearBox} onPress={this.clearCompany}>
          <Image source={clearImg} style={styles.clearimg} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  render() {
    const {name} = this.props;
    return (
      <View style={styles.layout}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="请输入商铺名"
            onChangeText={this.inputName}
            value={name}
          />
          {this._renderClear()}
        </View>
        <Text style={styles.tips}>30天内仅可修改一次</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {name} = state.MerEditShop;
  const {token} = state.UserInfo;

  return {
    name,
    token,
  };
}

export default connect(mapStateToProps)(EditShopName);
