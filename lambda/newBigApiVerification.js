const fetch = require("node-fetch");

const { URLSearchParams } = require("url");

exports.newBigApiVerification = (event, context, callback) => {
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
            const params = new URLSearchParams();
            params.append("email", event.email);
            params.append("verification_code", event.token);

            fetch("https://api.bigtoken.com/signup/email-verification", {
              method: "POST",
              body: params,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded ",
                "Content-Length": 387,
                Host: "api.bigtoken.com",
                Connection: "Keep-Alive",
                "Accept-Encoding": "gzip ",
                "User-Agent": "okhttp/3.14.0"
              }
            })
              .then(res => res.text())
              .then(text => callback(null, text))
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
