function route(pathname, handle, res, queryData) {
  console.log("pathname: " + pathname);
  if (typeof handle[pathname] == "function") {
    // productId가 필요한 경우
    if (pathname === "/order" && queryData && queryData.productId) {
      handle[pathname](res, queryData.productId);
    } else {
      handle[pathname](res);
    }
    // handle[pathname](res, productId);
  } else {
    console.log("No request handler found for " + pathname);
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("404 Not Found");
    res.end();
  }
}

exports.route = route;
