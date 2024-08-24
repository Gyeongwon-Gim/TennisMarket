const fs = require("fs");
const main_view = fs.readFileSync("./main.html", "utf-8");
const mariadb = require("./database/connect/mariadb");

function main(res) {
  console.log("main");

  mariadb.query("SELECT * FROM product;", function (err, rows) {
    if (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.write("Database error");
      res.end();
      return;
    }
    console.log(rows);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(main_view);
    res.end();
  });
}

function redRacket(res) {
  fs.readFile("./img/redRacket.png", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(data);
    res.end();
  });
}

function blueRacket(res) {
  fs.readFile("./img/blueRacket.png", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(data);
    res.end();
  });
}

function blackRacket(res) {
  fs.readFile("./img/blackRacket.png", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(data);
    res.end();
  });
}

function order(res, productId) {
  mariadb.query(
    "INSERT INTO orderlist VALUES (?, ?)",
    [productId, new Date().toISOString().split("T")[0]],
    function (err, data) {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
        res.write("Database error");
        res.end();
        return;
      }
      console.log(data);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("Order place successfully");
      res.end();
    }
  );
}
let handle = {};

handle["/"] = main;
handle["/order"] = order;
// image directory
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;
