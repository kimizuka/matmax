(function() {

  "use strict";

  var socket  = io.connect(),
      display = document.getElementById("display"),
      area    = document.getElementById("area");

  socket.on("SET_INDEX", function(index) {
    var option = document.querySelector("[value='" + index + "']");
    option.selected = "selected";
    display.innerText = option.innerText;

    area.addEventListener("change", function() {
      socket.emit("GET_INDEX", area.value);
    });
  });

})();