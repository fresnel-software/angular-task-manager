function MyApp() {
  this._handlers = [];

  this.get = function (url, handle) {
    this._handlers.push({method: 'GET', url, handle})
  };

}

MyApp.prototype.handle = function (request, response) {
  function compareUrl(handlerUrl, requestUrl) {
    if (handlerUrl === requestUrl) {
      return true;
    } else {
      // TODO rewrite it, handle only 1st params
      [handlerPureUrl, handlerParam] = handlerUrl.split(':');
      if (requestUrl.startsWith(handlerPureUrl)) {
        request.params = {[handlerParam]: requestUrl.slice(handlerPureUrl.length)};
        return true;
      } else {
        return false;
      }
    }
  }

  var handler = this._handlers
    .find(handler=>handler.method === request.method && compareUrl(handler.url, request.url));
  if (handler) {
    handler.handle(request, response);
  } else {
    handle404(request.url, response);
  }
};

['GET', 'POST', 'PUT', 'DELETE'].forEach(method=> {
  MyApp.prototype[method.toLowerCase()] = function (url, handle) {
    this._handlers.push({method, url, handle})
  };
});

module.exports = MyApp;
