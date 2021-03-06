const fetch = require("node-fetch");

exports.newBigApiCreateEmail = (event, context, callback) => {
  const response = {
    status: "failed",
    message: "mohon masukan kode sgb"
  };
  if (Object.prototype.hasOwnProperty.call(event.headers, "x-api-key")) {
    try {
      fetch(
        `http://134.209.61.112/x.php?sgbcode=${event.headers["x-api-key"]}`,
        {
          method: "GET"
        }
      )
        .then(res => res.json())
        .then(text => {
          if (text.status === "ok") {
            fetch(`https://generator.email/email-generator`, {
              method: "get",
              redirect: "follow",
              headers: {
                accept:
                  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "accept-encoding": "gzip, deflate, br",
                cookie: `_ga=GA1.2.1164348503.1554262465; _gid=GA1.2.905585996.1554262465; embx=%5B%22hcycl%40nongzaa.tk%22%5D; surl=${
                  event.domain
                }/${event.uname}/; io=_LbPUqg0408QUbi1aCWe`,
                "upgrade-insecure-requests": 1,
                "user-agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
              }
            })
              .then(res => res.text())
              .then(ress => callback(null, ress))
              .catch(err => callback(null, err));
          } else {
            callback(null, {
              status: "failed",
              message: "bhhh bukan member sgb"
            });
          }
        })
        .catch(err => callback(null, err));
    } catch (err) {
      callback(null, response);
    }
  } else {
    callback(null, response);
  }
};
