var amapFile = require('../../libs/amap-wx.js');
const app = getApp()

var markersData = {
  iconPath: "../../images/icon-marker-active.png",
  id: 0,
  latitude: 40.002607,
  longitude: 116.487847,
  width: 15,
  height: 25
}

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'a374f6fbba1016da4bf389864ed1509b' });
    myAmapFun.getPoiAround({
      iconPathSelected: '../../images/icon-marker-active.png', //如：..­/..­/img/marker_checked.png
      iconPath: '../../images/icon-marker.png', //如：..­/..­/img/marker.png
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../images/icon-marker-active.png"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "../../images/icon-marker.png"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})
