const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

exports.newBigApiCreateTop = (event, context, callback) => {
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
            const con = {
              username: event.unem,
              domain: "topmail.com",
              password: "Coegsekali1"
            };
            fetch(`https://www.topmail.com/accounts/users`, {
              method: "post",
              body: JSON.stringify(con),
              agent: new HttpsProxyAgent("http://" + event.proxy),
              headers: {
                Accept: "application/json, text/javascript, */*; q=0.01",
                "Content-Type": "application/json",
                Cookie:
                  "connect.sid=s%3AQPoz-XmKLb-qidWl0nc7Apy6HfQYV4b9.ZrqdZ0wA2JY6HtZIpttHgQKzbps9dNxQTfGtTKBYuuQ; _ga=GA1.2.1908865400.1555142983; _gid=GA1.2.1213876548.1555142983; crisp-client%2Fsession%2F-KFP7ts21LTwDLv2z1s5=session_a6554b66-b393-4a7c-b754-c0f22431620c",
                Host: "www.topmail.com",
                Origin: "https://www.topmail.com",
                Referer: "https://www.topmail.com/signup",
                "If-None-Match": 'W/"447f-3qDKQvCqM4nCxpy9vg4UBX9vc3c-gzip"',
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
                "X-Requested-With": "XMLHttpRequest"
              }
            })
              .then(res => res.text())
              .then(te => {
                fetch(`https://www.topmail.com/verification?`, {
                  method: "get",
                  agent: new HttpsProxyAgent("http://" + proxy),
                  headers: {
                    Accept: "application/json, text/javascript, */*; q=0.01",
                    "Content-Type": "application/json",
                    Cookie:
                      "connect.sid=s%3AQPoz-XmKLb-qidWl0nc7Apy6HfQYV4b9.ZrqdZ0wA2JY6HtZIpttHgQKzbps9dNxQTfGtTKBYuuQ; _ga=GA1.2.1908865400.1555142983; _gid=GA1.2.1213876548.1555142983; crisp-client%2Fsession%2F-KFP7ts21LTwDLv2z1s5=session_a6554b66-b393-4a7c-b754-c0f22431620c",
                    Referer: "https://www.topmail.com/signup",
                    "If-None-Match":
                      'W/"447f-3qDKQvCqM4nCxpy9vg4UBX9vc3c-gzip"',
                    "User-Agent":
                      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
                    "X-Requested-With": "XMLHttpRequest"
                  }
                })
                  .then(res => res.text())
                  .then(te => {
                    fetch(`https://www.topmail.com/confirmation`, {
                      method: "get",
                      agent: new HttpsProxyAgent("http://" + proxy),
                      headers: {
                        Accept:
                          "application/json, text/javascript, */*; q=0.01",
                        "Content-Type": "application/json",
                        Cookie:
                          "connect.sid=s%3AQPoz-XmKLb-qidWl0nc7Apy6HfQYV4b9.ZrqdZ0wA2JY6HtZIpttHgQKzbps9dNxQTfGtTKBYuuQ; _ga=GA1.2.1908865400.1555142983; _gid=GA1.2.1213876548.1555142983; crisp-client%2Fsession%2F-KFP7ts21LTwDLv2z1s5=session_a6554b66-b393-4a7c-b754-c0f22431620c",
                        Referer: "https://www.topmail.com/signup",
                        "If-None-Match":
                          'W/"447f-3qDKQvCqM4nCxpy9vg4UBX9vc3c-gzip"',
                        "User-Agent":
                          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
                        "X-Requested-With": "XMLHttpRequest"
                      }
                    })
                      .then(res => res.text())
                      .then(te => {
                        const $ = cheerio.load(te);
                        const src = $("h3").text();
                        callback(null, src);
                      })
                      .catch(err => callback(null, err));
                  })
                  .catch(err => callback(null, err));
              })
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
