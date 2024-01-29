"use strict";

const request = require("request");

class Weather {
  constructor() {
    this.param = {
      isRain : false,
      isSnow : false
    }
  }

  getWeather(areaIndex) {
    return new Promise((resolve, reject) => {
      request({
        url     : `http://api.yumake.jp/1.1/forecastPref.php?format=json&code=${areaIndex}&key=${process.env.apikey || ""}`,
        method  : "GET",
        headers : {
          "Content-Type" : "application/json"
        },
        json    : true
      }, (err, res, body) => {
        let isRain = false,
            isSnow = false;

        if (err) {
          resolve({
            isRain,
            isSnow
          });
        }

        if (body.status !== "error") {
          body.area.forEach((area) => {
            this.param.isRain = isRain || /雨/.test(area.weather[0]);
            this.param.isSnow = isSnow || /雪/.test(area.weather[0]);
          });
        }

        resolve(this.param);
      });
    });
  }
}

module.exports = Weather;