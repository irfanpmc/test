const rp = require("request-promise");
const fetch = require("node-fetch");

exports.newBigApiGetLoc = (event, context, callback) => {
  const funcGetLoc = () =>
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
            const userAgent =
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36";
            const url = `${event.url}`;

            const _include_headers = function(
              body,
              response,
              resolveWithFullResponse
            ) {
              return {
                headers: response.headers,
                data: body,
                finalUrl: response.request.uri.href // contains final URL
              };
            };

            const options = {
              uri: url,
              followAllRedirects: true,
              method: "get",
              gzip: true,
              transform: _include_headers,
              headers: {
                "User-Agent": userAgent
              }
            };

            const p1 = rp(options)
              .then((response, error, html) => {
                resolve(response.finalUrl);
              })
              .catch(err => resolve(err));
          } else {
            callback(null, {
              status: "failed",
              message: "bhhh bukan member sgb"
            });
          }
        })
        .catch(err => resolve(err));
    });
  const response = {
    status: "failed",
    message: "mohon masukan kode sgb"
  };

  if (Object.prototype.hasOwnProperty.call(event.headers, "x-api-key")) {
    try {
      funcGetLoc().then(res => {
        callback(null, res);
      });
    } catch (err) {
      callback(null, response);
    }
  } else {
    callback(null, response);
  }
};
