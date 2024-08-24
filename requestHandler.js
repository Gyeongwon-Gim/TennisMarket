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

function orderlist(res) {
  console.log("orderlist");
  mariadb.query("SELECT * FROM orderlist;", function (err, rows) {
    if (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.write("Database error");
      res.end();
      return;
    }
    // HTML 문자열로 테이블 생성
    let html = `
    <html>
    <head>
      <title>Order List</title>
    </head>
    <body>
    <h1>Order List</h1>
    <table border="1">
      <tr>
        <th>Product ID</th>
        <th>Order Date</th>
      </tr>`;
    rows.forEach((row) => {
      const date = new Date(row.event_date);
      const formattedDate = date.toISOString().split("T")[0];
      html += `
      <tr>
        <td>${row.id}</td>
        <td>${formattedDate}</td>
      </tr>`;
    });

    html += `
      </table>
      </body>
      </html>
    `;
    // 내가 작성한거
    console.log(rows);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
    // res.write(rows);
    res.write(html);
    res.end();
  });
}
// 상품 이미지 출력
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
  event_date = new Date().toISOString().split("T")[0];
  mariadb.query(
    "INSERT INTO orderlist VALUES (?, ?)",
    [productId, event_date],
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
handle["/orderlist"] = orderlist;
handle["/order"] = order;
// image directory
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;
