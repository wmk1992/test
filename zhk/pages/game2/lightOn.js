// pages/game/lightOn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '第二关',
    cs: [],
    count: 0,
    seconds: 0,
    time: '00:00:00',
    cost: 0,
    finalCount: 0,
    finalTime: '00:00:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cs = createRandom(3, 1, 9);
    this.setData({
      cs: cs
    })
  },
  touch: function (event) {
    if (this.data.count == 0) {
      timing(this);
      charging(this);
    }
    var that = this;
    var count = that.data.count + 1;
    that.setData({
      count: count
    })
    var selectedId = event.target.id;
    var finaln = js(selectedId);
    for (var i = 0; i < finaln.length; i++) {
      var cs = that.data.cs;
      //var res = checkfinsh(cs);
      if (cs[finaln[i]] == 'td') {
        cs[finaln[i]] = 'td cl';
        that.setData({
          cs: cs
        })
      } else {
        cs[finaln[i]] = 'td';
        that.setData({
          cs: cs
        })
      }
    }
    var css = that.data.cs;
    var res = checkfinsh(css);
    if (res == 'y') {
      var countfinal = that.data.count;
      var timefinal = that.data.time;
      wx.showToast({
        title: '恭喜进入下一关',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../game3/lightOn',
        })
      }, 1000)
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var finalCount = this.data.finalCount;
    var title;
    //if (finalCount > 0) {
      //title = '我能用' + finalCount + '步完成，你呢'
    //} else {
      title = '惭愧惭愧，第二关竟然过不去。。。'
    //}

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: '/pages/game/lightOn'
    }
  },

  restart: function () {
    clearTimeout(t);
    var cs = createRandom(3, 1, 9);
    this.setData({
      cs: cs,
      count: 0,
      seconds: 0,
      time: '00:00:00',
      cost: 0
    })
  }
})
function js(n) {
  var n = parseInt(n);
  var sn = (n - 3) <= 0 ? 0 : n - 3;
  var qn = (n - 1) <= 0 ? 0 : n - 1;
  var hn = (n + 1) > 9 ? 0 : n + 1;
  if (n % 3 == 0) {
    hn = 0;
  }
  if (n % 3 == 1) {
    qn = 0;
  }
  var xn = (n + 3) > 9 ? 0 : n + 3;
  return [n, sn, qn, hn, xn];
}
function checkfinsh(cs) {
  var result = 'y';
  for (var i = 1; i < cs.length; i++) {
    if (cs[i] == 'td cl') {
      result = 'n';
      break;
    }
  }
  return result;
}
var t;

//计时器
function timing(that) {
  clearTimeout(t);
  var seconds = that.data.seconds
  if (seconds > 21599) {
    that.setData({
      time: '6小时，不想继续了gg'
    });
    return;
  }
  t = setTimeout(function () {
    that.setData({
      seconds: seconds + 1
    });
    timing(that);
  }, 1000)
  formatSeconds(that)
}
function formatSeconds(that) {
  var mins = 0, hours = 0, seconds = that.data.seconds, time = ''
  if (seconds < 60) {

  } else if (seconds < 3600) {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
  } else {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
    hours = parseInt(mins / 60)
    mins = mins % 60
  }
  that.setData({
    time: formatTime(hours) + ':' + formatTime(mins) + ':' + formatTime(seconds)
  });
}
function formatTime(num) {
  if (num < 10)
    return '0' + num
  else
    return num + ''
}
function charging(that) {
  if (that.data.seconds < 600) {
    that.setData({
      cost: 1
    });
    //cost = 1
  }
}

//产生不重复的随机数
function createRandom(num, min, max) {
  let arr = [], res = [], newArr;
  for (let i = min; i < max; i++) {
    arr.push(i);
  }
  newArr = Object.assign([], arr);
  for (let item = 0; item < arr.length; item++) {
    res.push(newArr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
  }
  res.length = num;
  var cs = ['', 'td', 'td', 'td', 'td', 'td', 'td', 'td', 'td', 'td'];
  for (var i = 0; i < res.length; i++) {
    cs[res[i]] = 'td cl';
  }
  return cs;
}