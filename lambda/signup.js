const fetch = require("node-fetch");
const ua = require("useragent-generator");
const { URLSearchParams } = require("url");

exports.newSignup = (event, context, callback) => {
  const params = new URLSearchParams();
  params.append("email", event.email);
  params.append("password", "Coegsekali1!");
  params.append("referral_id", "AMIN4UDIN");
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
      "Content-Length": 82,
      Host: "api.bigtoken.com",
      Connection: "Keep-Alive",
      "Accept-Encoding": "gzip"
    }
  })
    .then(res => res.json())
    .then(json => {
      callback(null, json);
    })
    .catch(err => callback(null, err));
};
