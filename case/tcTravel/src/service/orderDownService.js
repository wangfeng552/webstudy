import fetch from '../config/fetch';

class queryOrderServer {
  //获取服务器时间
  getTime() {
    return fetch('pointgate/common/getServerDate', '', 'GET')
  };

  //价格日历查询接口
  getSceneryList(priceId) {
    return new Promise((resolve, reject) => {
      this.getTime().then((resTime) => {
        if (resTime.data && resTime.data.serverDate) {
          let date = new Date(resTime.data.serverDate);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          fetch('pointgate/ly/priceCalendar/query', {
            priceId,
            travelDate: year + "-" + (month < 10 ? '0'+month : month) + "-" + (day < 10 ? '0'+day : day),
            monthNumber: 3
          }, 'POST').then((res) => {
            if (res.respCode === "0000") {
              resolve({
                data: res.data.elements,
                today: {
                  year,
                  month,
                  day
                }
              });
            } else {
              reject(res);
            }
          })
        } else {
          console.log('返回时间失败');
          reject(res);
        }
      });
    });
  };

  // 设置时间跟同城的时间一至
  setDay(year, month, day, dayAltogether) {
    if (day > dayAltogether) {
      day = day - dayAltogether; // 当前天
      month = month + 1; //当前月
      if (month > 12) {
        month = month - 12;
        year = year + 1;
      }
    }
    let _month = month < 10 ? "0" + month : month;
    let _day = day < 10 ? "0" + day : day;
    return year + "-" + _month + "-" + _day;
  }

  // 截取时间 只要月-日
  setMonthDay(time) {
    let list = time.split('-');
    return list[1] + '-' + list[2];
  }


  // 处理时间, 今天, 明天, 后天, 时间
  disposeTime(obj, today) {
    // 先判断当前月有多少天, 然后再算出明天,后天的拼接的字符串
    let dayAltogether = new Date(today.year, today.month, 0).getDate(); // 获取这个月一共有多少天
    // 今天, 明天, 后天
    let nearbyDay = {
      today: this.setDay(today.year, today.month, today.day, dayAltogether),
      tomorrow: this.setDay(today.year, today.month, today.day + 1, dayAltogether),
      afterTomorrow: this.setDay(today.year, today.month, today.day + 2, dayAltogether)
    };

    // 再拿时间对比
    for (let i = 0; i < obj.length; i++) {
      if (nearbyDay.today === obj[i].date) {
        obj[i].display = "今天";
      } else if (nearbyDay.tomorrow === obj[i].date) {
        obj[i].display = "明天";
      } else if (nearbyDay.afterTomorrow === obj[i].date) {
        obj[i].display = "后天";
      } else {
        // 其他时间就只显示年月了
        obj[i].display = this.setMonthDay(obj[i].date);
      }
    }
  }

  // 下单页面的时间
  getLatelyTime(priceId) {
    return new Promise((resolve, reject) => {
      this.getSceneryList(priceId).then((res) => {
        // 如果请求返回时间, 则对时间相应的处理
        //下单页面只显示两天的时间 今天 明天,  明天 后天, 后天 月-日
        // 所以只拿取两天的时间
        let dayList = res.data.slice(0, 2);
        // 然后再将这两天时间做处理
        this.disposeTime(dayList, res.today);
        resolve(dayList);
      }, (rej) => {
        reject(rej);
      });
    });
  }

  //  兼容获取星期几
  getWeek(year, month, day) {
    let time = new Date(year + "-" + month + "-" + day);
    let week = time.getDay();
    if (!week) {
      time = new Date(year + "/" + month + "/" + day);
      week = time.getDay();
    }
    return week;
  }

  // 得到每个月的日期
  getDayFunc(year, month, elementList) {
    // 创建一个当前月的时间
    let d = new Date(year, month, 0);
    // 获取当前月有多少天
    let monthDayNumber = d.getDate();
    let dayList = [];
    for (let day = 1; day <= monthDayNumber; day++) {
      // debugger;
      let calendarTime = {
        date: this.setDay(year, month, day),
        day
      };
      for (let j = 0; j < elementList.length; j++) {
        //  后台返回的数据 跟本地遍历的时间能够对应, 则代表有这个时间
        if (calendarTime.date == elementList[j].date) {
          calendarTime.priceId = elementList[j].priceId; //  id
          calendarTime.tcAmount = elementList[j].tcAmount; // 同城价格

          calendarTime.agentAmount = elementList[j].agentAmount;
          calendarTime.ticketName = elementList[j].ticketName;

          calendarTime.isStock = elementList[j].isStock; // 是否有库存
          calendarTime.minTickets = elementList[j].minTickets; // 单次预订最小票数
          calendarTime.maxTickets = elementList[j].maxTickets; // 单次预订最大票数
          calendarTime.isStock = elementList[j].isStock; // 单次预订最大票数
          calendarTime.week = this.getWeek(year, month, day); //获取当天星期几
        }
      }
      dayList.push(calendarTime);
    }

    let week = this.getWeek(year, month, 1);

    // 当前月是星期几
    let weekList = [];
    weekList.length = week;
    weekList.concat(dayList);
    return weekList.concat(dayList);
  }


  getMonthFunc(year, month, elementList) {
    let timeList = [];
    // 一共显示多少个月
    for (let i = 0; i < 3; i++) {
      var _month = month + i;
      var _year = year;
      if (_month > 12) {
        _month = _month - 12;
        _year++;
      }

      timeList.push({
        year: _year,
        month: _month,
        dayList: this.getDayFunc(_year, _month, elementList)
      });
    }
    return timeList;
  }

  // 获取日历
  getCalendar(priceId) {
    return new Promise((resolve, reject) => {
      this.getSceneryList(priceId).then((res) => {
        resolve({
          calendar: this.getMonthFunc(res.today.year, res.today.month, res.data),
          year: res.today.year,
          month: res.today.month,
          day: res.today.day
        })
      }, (rej) => {
        reject(rej);
      });
    })
  }

  getScreenings(para) {
    // 将数据处理mint需要的格式
    return new Promise((resolve, reject) => {
      fetch('pointgate/ly/screenin/query', para, 'POST').then(res => {
        let len = res.data.elements.length;
        res.data.values = [];
        for (let i = 0; i < res.data.elements.length; i++) {
          res.data.values.push(res.data.elements[i].showBeginTime + '-' + res.data.elements[i].showEndTime);
        }
        resolve(res);
      }, rej => {
        resolve(rej);
      })
    })
  };

  // 下单接口
  apply(obj) {
    // 将传到后台的请求参数int类型全部转成string类型, undefined 改成''
    for (let o in obj) {
      if (typeof obj[o] === "number") {
        obj[o] = obj[o] + "";
      } else if (typeof obj[o] === "undefined") {
        obj[o] = "";
      }
    }
    return fetch('pointgate/ly/order/apply', obj, 'POST')
  };

  // 获取签名
  autograph(para) {
    return fetch('pointgate/ly/order/confromPay', para, 'POST')
  };
}

export default new queryOrderServer();
