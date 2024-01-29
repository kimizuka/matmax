"use strict"

var wrapper = document.getElementById("wrapper"),
    reset   = document.getElementById("reset");

document.addEventListener("keypress", function(evt) {
  var SPACE_KEY = 32;

  if (evt.charCode === SPACE_KEY) {
    fetch("/audio", {
      method: "POST"
    });
  }
}, false);

delegate(wrapper, "click", "[data-index]", function(evt) {
  let index = this.dataset.index;

  wrapper.dataset.currentIndex = index;
  fetch(`/index?index=${index}`, {
    method: "POST"
  });
});

function delegate(parent, eventName, selector, callback) {
  parent.addEventListener(eventName, (evt) => {
    (function checkTarget(target) {
      if (target.matches(selector, parent)) {
        callback.call(target);
      } else {
        if (target === parent) {
          return;
        } else {
          checkTarget(target.parentNode);
        }
      }
    })(evt.target);
  }, false);
}

reset.addEventListener("click", () => {
  location.search = `time=${Date.now()}`;
});