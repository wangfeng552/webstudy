import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {inputDetail, saveShopDetails} from '../../actions/MerEditShop';

class EditShopDetail extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '商铺介绍',
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
    const {dispatch, navigation} = this.props;
    let detail = navigation.state.params.detail;
    dispatch(inputDetail(detail));
    this.props.navigation.setParams({
      navigatePress: this.saveShopDetails,
    });
  }

  inputDetail = v => {
    const {dispatch} = this.props;
    dispatch(inputDetail(v));
  };

  saveShopDetails = () => {
    const {dispatch, token, shopDetail} = this.props;
    dispatch(saveShopDetails(shopDetail, token));
  };

  render() {
    const {shopDetail} = this.props;
    return (
      <View style={styles.layout}>
        <TextInput
          multiline={true}
          style={styles.inputheight200}
          onChangeText={this.inputDetail}
          value={shopDetail}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {shopDetail} = state.MerEditShop;
  const {token} = state.UserInfo;

  return {
    shopDetail,
    token,
  };
}

export default connect(mapStateToProps)(EditShopDetail);
