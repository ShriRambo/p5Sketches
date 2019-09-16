function doSomething() {
  alert('A');
}

(function loop() {
  var rand = Math.round(Math.random() * (3000 - 500)) + 500;
  setTimeout(function () {

    doSomething();
    loop();
  }, rand);
}());