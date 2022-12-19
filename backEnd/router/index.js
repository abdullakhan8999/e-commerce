module.exports = function (App) {
  App.get("/ecomm/api/v1/", (req, res, next) => {
    res.write("This is base router.");
    res.end();
  });
};
