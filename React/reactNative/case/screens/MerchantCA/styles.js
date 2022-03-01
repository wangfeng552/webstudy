import {StyleSheet, Dimensions} from 'react-native';
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8f9',
    position: 'relative',
  },
  itemBox: {
    height: 48,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 16,
  },
  titleright: {
    fontSize: 14,
    color: '#333333',
    marginRight: 16,
  },
  textInput: {
    fontSize: 14,
    color: '#999999',
    marginRight: 16,
    textAlign: 'right',
    width: WIDTH - 104,
  },
  headText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  clickAdd: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 16,
  },
  clickText: {
    fontSize: 14,
    color: '#999999',
  },
  uploadimg: {
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadImgWidth: {
    width: 243,
    height: 175,
  },
  rzpic: {
    width: 168,
    height: 117,
    position: 'absolute',
    left: '30%',
    top: '10%',
    zIndex: 100,
  },
  navRightBtn: {
    color: '#f00',
    fontSize: 12,
    marginRight: 10,
    height: 50,
    width: 50,
    lineHeight: 50,
    textAlign: 'center',
  },
});

export default styles;
