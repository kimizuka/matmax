"use strict"

const express = require("express");

const app   = express();
const http  = require("http").Server(app);
const five  = require("johnny-five");
const Audio = require("./lib/Audio");

try {
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

    let index = 0;

    btnL.on("down", function() {
      Audio.play(index);
      ledL.on();
    });

    btnR.on("down", function() {
      Audio.play(index);
      ledR.on();
    });

    btnL.on("up", function() {
      ledL.off();
    });

    btnR.on("up", function() {
      ledR.off();
    });

    app.post("/index", function(req, res) {
      index = parseInt(req.url.match(/\d+$/)[0], 10);

      res.send("ok");
    });

    app.post("/audio", function(req, res) {
      Audio.play(index);
      res.send("ok");
    });

    app.use("/", express.static(__dirname + "/public"));
    http.listen(3000, "0.0.0.0");
  });
} catch (err) {
  console.error(err);
}