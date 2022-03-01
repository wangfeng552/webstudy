import React from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  inputStoreName,
  inputStoreTel,
  inputStoreAddress,
  inputContactName,
  inputCell_phone,
  inputTelephone,
  inputMailbox,
  inputContactAddress,
  uploadBusinessLicenseImg,
  submitMerchantCA,
  clearMerchantCA,
} from '../../actions/MerchantCA';
import Button from '../../components/Button';
const placeholderPic = require('../../images/ic_upload_img.png');

class MerchantCA extends React.Component {
  static navigationOptions = () => ({
    title: '商户认证',
  });
  constructor(props) {
    super(props);
    this.state = {
      uploadImg: require('../../images/ic_upload_img.png'),
    };
  }

  

  _renderItemHeader = title => {
    return <Text style={styles.headText}>{title}</Text>;
  };

  setData = (title, text) => {
    const {dispatch} = this.props;
    switch (title) {
      case '企业名称':
        dispatch(inputStoreName(text));
        break;
      case '企业电话':
        dispatch(inputStoreTel(text));
        break;
      case '企业地址':
        dispatch(inputStoreAddress(text));
        break;
      case '姓名':
        dispatch(inputContactName(text));
        break;
      case '电话':
        dispatch(inputCell_phone(text));
        break;
      case '手机号':
        dispatch(inputTelephone(text));
        break;
      case '邮箱':
        dispatch(inputMailbox(text));
        break;
      case '地址':
        dispatch(inputContactAddress(text));
        break;
    }
    console.log('=>', title, text);
  };

  onMerchantCA = () => {
    const {dispatch} = this.props;
    dispatch(submitMerchantCA(this.props));
  };

  uploadBusinessLicense = () => {
    const {token, dispatch} = this.props;
    const options = {
      title: '上传营业执照',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从手机相册选择',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        dispatch(uploadBusinessLicenseImg(response.data, token));
      }
    });
  };

  _renderInputItem = (title, data) => {
    return (
      <View style={styles.itemBox}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.textInput}
          value={data}
          placeholder={'请输入' + title}
          onChangeText={text => {
            this.setData(title, text);
          }}
        />
      </View>
    );
  };

  _renderAddressItem = (title, data) => {
    let submit = data && data.length > 0 ? data : '请输入' + title;
    return (
      <View style={styles.itemBox}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.clickAdd}>
          <Text style={styles.clickText}>{submit}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderAddLicenseImg = () => {
    const {licenseImg} = this.props;
    if (licenseImg === '') {
      return (
        <View style={styles.uploadimg}>
          <TouchableOpacity onPress={this.uploadBusinessLicense}>
            <Image style={styles.uploadImgWidth} source={placeholderPic} />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.uploadimg}>
        <TouchableOpacity onPress={this.uploadBusinessLicense}>
          <Image style={styles.uploadImgWidth} source={{uri: licenseImg}} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      storeName,
      storeTel,
      storeAddress,
      contactName,
      cell_phone,
      telephone,
      mailbox,
      contactAddress,
      licenseImg,
    } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {this._renderItemHeader('企业信息')}
          {this._renderInputItem('企业名称', storeName)}
          {this._renderInputItem('企业电话', storeTel)}
          {this._renderInputItem('企业地址', storeAddress)}
          {this._renderItemHeader('企业联系人信息')}
          {this._renderInputItem('姓名', contactName)}
          {this._renderInputItem('电话', cell_phone)}
          {this._renderInputItem('手机号', telephone)}
          {this._renderInputItem('邮箱', mailbox)}
          {this._renderInputItem('地址', contactAddress)}
          {this._renderItemHeader('上传营业执照')}
          {this._renderAddLicenseImg('上传营业执照', licenseImg)}
          <Button value="完成" onPress={this.onMerchantCA} />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    storeName,
    storeTel,
    storeAddress,
    contactName,
    cell_phone,
    telephone,
    mailbox,
    contactAddress,
    licenseImg,
    licenseImgRelative,
  } = state.MerchantCA;
  const {token} = state.UserInfo;
  return {
    storeName,
    storeTel,
    storeAddress,
    contactName,
    cell_phone,
    telephone,
    mailbox,
    contactAddress,
    licenseImg,
    licenseImgRelative,
    token,
  };
}

export default connect(mapStateToProps)(MerchantCA);
