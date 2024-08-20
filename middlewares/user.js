const User = require("../models/user");

///////
exports.userById = (req, res, next, id) => {
  /////
  User.findById(id)
    .then((user) => {
      req.profile = user;
      //   console.log("req.params :  ", req.params.userId);
      //   console.log("my id :  ", id);
      //   console.log("my user :  ", user);
      //   console.log("req.profile :  ", req.profile);
      next();
    })
    .catch((err) => {
      return res.status(404).json({
        error: "user not found !!!",
      });
    });
};
