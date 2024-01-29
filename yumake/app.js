"use strict"

require("dotenv").config();

const express       = require("express"),
      app           = express(),
      http          = require("http").Server(app),
      io            = require("socket.io")(http),
      five          = require("johnny-five"),
      Audio         = require("../lib/Audio"),
      Weather       = require("./Weather"),
      DEFAULT_VALUE = "13", // 東京
      SUNNY_INDEX   = 0,
      RAIN_INDEX    = 3,
      SNOW_INDEX    = 1;

let weather      = new Weather(),
    areaIndex    = DEFAULT_VALUE,
    audioIndex   = SUNNY_INDEX;

app.use("/", express.static(__dirname + "/public"));

weather.getWeather(areaIndex).then(setAudioIndex);

setInterval(() => {
  weather.getWeather(areaIndex).then(setAudioIndex);
}, 1000 * 60 * 60 * 3);

io.on("connection", (evt) => {
  evt.emit("SET_INDEX", areaIndex);

  evt.on("GET_INDEX", (evt) => {
    areaIndex = evt;
    io.sockets.emit("SET_INDEX", areaIndex);
    weather.getWeather(areaIndex).then(setAudioIndex);
  });
});

five.Board().on("ready", function() {
  const btnL = new five.Button({
          pin: 8,
          isPullup: true
        }),
        btnR = new five.Button({
          pin: 9,
          isPullup: true
        }),
        ledL = new five.Led(12),
        ledR = new five.Led(13);

  btnL.on("down", function() {
    if (audioIndex) {
      Audio.play(audioIndex);
    }
    ledL.on();
  });

  btnR.on("down", function() {
    if (audioIndex) {
      Audio.play(audioIndex);
    }
    ledR.on();
  });

  btnL.on("up", function() {
    ledL.off();
  });

  btnR.on("up", function() {
    ledR.off();
  });
});

http.listen(3000, "0.0.0.0");

function setAudioIndex(evt) {
  audioIndex = SUNNY_INDEX;

  if (evt.isRain) {
    audioIndex = RAIN_INDEX;
  }

  if (evt.isSnow) {
    audioIndex = SNOW_INDEX;
  }
}