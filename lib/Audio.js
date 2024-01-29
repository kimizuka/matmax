"use strict";

const exec = require("child_process").exec;

class Audio {
  static get CONST() {
    return {
      PATH_LIST : [
        "./mp3/poison.mp3",
        "./mp3/snow-1.mp3",
        "./mp3/snow-2.mp3",
        "./mp3/water-1.mp3",
        "./mp3/water-2.mp3",
        "./mp3/glass.mp3",
        "./mp3/asphalt.mp3",
        "./mp3/leaves.mp3",
        "./mp3/flooring.mp3",
        "./mp3/stone.mp3"
      ]
    };
  }

  static _getPath(index) {
    return Audio.CONST.PATH_LIST[index];
  }

  static stop() {
    
  }

  static play(index = 0) {
    const cmd = "play " + this._getPath(index);

    console.log(cmd);

    exec(cmd, (err, stdout, stderr) => {
      if (err) {

      }
    });
  }
}

module.exports = Audio;