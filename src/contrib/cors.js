var CORS = (function(){
  var module = {
    get: function(url, callback) {
      console.log(url)
      var xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.onload = function(res) {
        callback(res);
        // emitter.emit('XHR_REQEST_COMPLETE');
      };
      xhr.send(null);
    }
  }
  return module;
})();

module.exports = CORS;
