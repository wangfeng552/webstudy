import {StyleSheet, Dimensions} from 'react-native';
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8f9',
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  header: {
    backgroundColor: '#ff0000',
    alignItems: 'center',
  },
  headImage: {
    width: 84,
    height: 84,
    borderRadius: 48,
    marginTop: 56,
  },
  shopName: {
    fontSize: 24,
    marginTop: 24,
    marginBottom: 8,
    color: '#fff',
  },
  shopID: {
    color: 'white',
    fontSize: 14,
    marginBottom: 24,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    backgroundColor: 'white',
  },
  sectionItem: {
    alignItems: 'center',
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
  },
  sectionItemImage: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  title: {
    fontSize: 14,
    color: '#333333',
  },
  title24: {
    fontSize: 24,
    color: '#333333',
  },
  nextIcon: {
    height: 16,
    width: 16,
    marginLeft: 8,
  },
  staffBox: {
    backgroundColor: '#ff0000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 16,
    width: 16,
  },
  staffBoxMax: {
    backgroundColor: '#ff0000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 16,
    width: 28,
  },
  staffNo: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    width: 0.5,
    backgroundColor: '#ccc',
    height: '50%',
    marginTop: 21,
  },
  separatorL: {
    height: 0.5,
    backgroundColor: '#ccc',
    width: '100%',
  },
  sectionHeader: {
    height: 48,
    marginLeft: 16,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#999999',
  },
  subtitle: {
    color: '#39b54a',
    fontSize: 14,
  },
  headImgBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  headImg: {
    width: 32,
    height: 32,
    marginRight: 8,
    marginLeft: 16,
  },
  nick: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  scanBox: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 24 + 28,
  },
  scanBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanImg: {
    width: 48,
    height: 48,
    marginLeft: (WIDTH - 48 * 2) / 4,
    marginRight: (WIDTH - 48 * 2) / 4,
    marginBottom: 16,
  },
  tipBox: {
    flexDirection: 'row',
  },
  tipBox2: {
    flexDirection: 'row',
    borderBottomColor:'#efefef',
    borderBottomWidth:1,
  },
  item: {
    width: (WIDTH - 32) / 2,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipsPart: {
    marginTop: -24,
    backgroundColor: '#fff',
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 8,
  },
  subItem: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  text: {
    fontSize: 10,
    color: '#999',
    marginTop: 8,
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
  },
  itemPart: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default styles;
