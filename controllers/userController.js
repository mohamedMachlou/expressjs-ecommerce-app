const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.salam = (req, res) => {
  res.send({ message: "This is a users module" });
};

exports.signup = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      return res.send(user);
    })
    .catch((err) => res.send(err.message));
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // Check if there any user with same email...
  User.findOne({ email: email })
    .then((user) => {
      // if (user) {
      //   return res.status(200).json({
      //     message: `A user with this email already exist... ${user}`,
      //   });
      // }
      if (!user.authenticate(password)) {
        console.log("machlou test !!!");
        res.status(401).json({
          error: `Email or Password dont Match ${password}`,
        });
      }

      //// JWT

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token, { expire: new Date() + 65543445 });
      const { _id, email, name, role } = user;
      return res.json({
        token,
        user: { _id, email, name, role },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: `"User not found with this email, Please SignUp !`,
      });
    });

  // const { email, password } = req.body;
  // User.findOne({ email }, (err, user) => {
  //
  //   if (!user.authenticate(password)) {
  //     res.status(401).json({
  //       error: "Email or Password dont Match",
  //     });
  //   }
  //   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  //   res.cookie("token", token, { expire: new Date() + 65543445 });
  //   const { _id, email, name, role } = user;
  //  return res.json({
  //     token,
  //     user: { _id, email, name, role },
  //   });
  // });
};
