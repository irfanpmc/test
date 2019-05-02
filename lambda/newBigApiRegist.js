const fetch = require("node-fetch");
const ua = require("useragent-generator");
const base64 = require("base-64");
const { URLSearchParams } = require("url");

exports.newBigApiRegist = (event, context, callback) => {
  const funcRegist = () =>
    new Promise((resolve, reject) => {
      fetch(
        `http://134.209.61.112/x.php?sgbcode=${event.headers["x-api-key"]}`,
        {
          method: "GET"
        }
      )
        .then(res => res.json())
        .then(text => {
          if (text.status === "ok") {
            const params = new URLSearchParams();
            params.append("email", event.email);
            params.append("password", "Coegsekali1!");
            params.append("referral_id", event.Reff);
            params.append("monetize", 1);
            fetch("https://api.bigtoken.com/signup", {
              method: "post",
              body: params,
              headers: {
                Accept: "application/json ",
                "X-Client-ID":
                  "WW1GelpUWTBPbnBFY1hBMFVrTnNWbUZ4VTNsbFVHSnVlV3BTWm1rd1JrWkhlbHBxWm5OaFVsWjJhM3BhUkhocloyczk=",
                "User-Agent": ua.chrome.androidPhone({
                  version: "61.0.0",
                  androidVersion: "7.1.2",
                  device: "Nexus 6"
                }),
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": 93,
                Host: "api.bigtoken.com",
                Connection: "Keep-Alive",
                "Accept-Encoding": "gzip"
              }
            })
              .then(res => res.json())
              .then(json => {
                resolve(json);
              })
              .catch(err => reject(err));
          } else {
            callback(null, {
              status: "failed",
              message: "bhhh bukan member sgb"
            });
          }
        })
        .catch(err => reject(err));
    });
  const response = {
    status: "failed",
    message: "mohon masukan kode sgb"
  };
  if (Object.prototype.hasOwnProperty.call(event.headers, "x-api-key")) {
    try {
      funcRegist().then(res => {
        callback(null, res);
      });
    } catch (err) {
      callback(null, response);
    }
  } else {
    callback(null, response);
  }
};
