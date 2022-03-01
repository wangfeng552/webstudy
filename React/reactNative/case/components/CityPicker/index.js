import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import cityData from './city.json';

const {height} = Dimensions.get('window');

export default class CityPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 'province',
      show: props.show,
      data: cityData,
      province: {v: 0, n: '省'},
      city: {v: 0, n: '城市'},
      county: {v: 0, n: '区县'},
      town: {v: 0, n: '城镇/街道'},
    };
  }

  showCityPick = () => {
    this.setState({
      show: true,
    });
  };

  onComplete = () => {
    const {province, city, county, town} = this.state;
    this.setState({
      show: false,
      level: 'province',
      data: cityData,
      province: {v: 0, n: '省'},
      city: {v: 0, n: '城市'},
      county: {v: 0, n: '区县'},
      town: {v: 0, n: '城镇/街道'},
    });
    this.props.onSelected &&
      this.props.onSelected({
        provinceCode: province.v,
        provinceName: province.n,
        cityCode: city.v,
        cityName: city.n,
        countyCode: county.v,
        countyName: county.n,
        townCode: town.v,
        townName: town.n,
      });
  };

  onCancel = () => {
    this.setState({
      show: false,
      level: 'province',
      data: cityData,
      province: {v: 0, n: '省'},
      city: {v: 0, n: '城市'},
      county: {v: 0, n: '区县'},
      town: {v: 0, n: '城镇/街道'},
    });
  };

  _renderPick = () => (
    <View style={styles.container}>
      <View style={styles.titlebar}>
        {this._renderSelectedAddress()}
        {this._renderComplete()}
      </View>
      <FlatList
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={item => `${item.v}`}
      />
    </View>
  );

  _renderItem = ({item}) => {
    const {level, province, city, county, town} = this.state;
    let color = '#333';
    if (level === 'province' && province.v && province.v === item.v) {
      color = '#ff0000';
    } else if (level === 'city' && city.v && city.v === item.v) {
      color = '#ff0000';
    } else if (level === 'county' && county.v && county.v === item.v) {
      color = '#ff0000';
    } else if (level === 'town' && town.v && town.v === item.v) {
      color = '#ff0000';
    }
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.itemContainer}
        onPress={() => {
          this.onClickItem(item);
        }}>
        <Text style={[styles.itemText, {color: color}]}>{item.n}</Text>
      </TouchableOpacity>
    );
  };

  onClickItem = item => {
    if (this.state.level === 'province') {
      this.setState({
        level: 'city',
        province: item,
        city: {v: 0, n: '城市'},
        county: {v: 0, n: '区县'},
        town: {v: 0, n: '城镇/街道'},
        data: item.c,
      });
    } else if (this.state.level === 'city') {
      this.setState({
        level: 'county',
        city: item,
        county: {v: 0, n: '区县'},
        town: {v: 0, n: '城镇/街道'},
        data: item.c,
      });
    } else if (this.state.level === 'county') {
      this.setState({
        level: 'town',
        county: item,
        town: {v: 0, n: '城镇/街道'},
        data: item.c,
      });
    } else if (this.state.level === 'town') {
      this.setState({
        town: item,
      });
    }
  };

  _renderSelectedAddress = () => {
    const {province, city, county, town} = this.state;
    return [
      {item: province, type: 'province'},
      {item: city, type: 'city'},
      {item: county, type: 'county'},
      {item: town, type: 'town'},
    ].map((row, index) => {
      return (
        <TouchableOpacity
          key={index}
          activeOpacity={0.6}
          style={styles.titleContainer}
          onPress={() => {
            this._onClickSelectedAddress(row.item, row.type);
          }}>
          <Text style={styles.titleText} numberOfLines={1}>
            {row.item.n}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  _onClickSelectedAddress = (item, type) => {
    const {level, province, city, county} = this.state;
    if (level === type) {
      return;
    }
    let cData = [];
    if (type === 'province') {
      cData = cityData;
    } else if (type === 'city') {
      cData = province.c;
    } else if (type === 'county') {
      cData = city.c;
    } else if (type === 'town') {
      cData = county.c;
    }
    if (cData && cData.length > 0) {
      this.setState({
        level: type,
        data: cData,
      });
    }
  };

  _renderComplete = () => {
    let disabled = true;
    let color = '#666666';
    if (this.state.town.v && this.state.town.v !== 0) {
      disabled = false;
      color = '#999999';
    }
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btnBox}
        onPress={this.onComplete}
        disabled={disabled}>
        <Text style={[styles.titleText, {color: color}]}>确定</Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (!this.state.show) {
      return <View />;
    }
    return (
      <View style={styles.rootContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.container}
          onPress={() => this.onCancel()}
        />
        <View style={styles.content} pointerEvents="box-none">
          {this._renderPick()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rootContainer: {
    backgroundColor: 'rgba(56,56,56,0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  content: {
    height: (height * 3) / 5,
    backgroundColor: '#ffffff',
  },
  btnBox: {
    position: 'absolute',
    right: 0,
    height: 56,
    marginRight: 8,
    justifyContent: 'center',
  },
  titlebar: {
    flexDirection: 'row',
    height: 56,
    paddingLeft: 8,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#d9d9d9',
  },
  titleContainer: {
    height: 56,
    justifyContent: 'center',
    borderColor: '#ff0000',
  },
  titleText: {
    margin: 8,
    fontWeight: '200',
    fontSize: 14,
    maxWidth: 72,
  },
  itemContainer: {
    height: 48,
    padding: 8,
    justifyContent: 'center',
  },
  itemText: {
    margin: 8,
    fontWeight: '200',
    fontSize: 14,
  },
});
