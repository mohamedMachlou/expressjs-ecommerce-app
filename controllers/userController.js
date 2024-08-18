const User = require("../models/user");

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

// const User = require("../models/user");

// exports.signup = (req, res) => {
//   // Create a new user instance with the request body
//   const user = new User(req.body);

//   // Save the user to the database
//   user
//     .save()
//     .then(() => {
//       res.status(201).send({
//         message: "User created successfully",
//         user: {
//           name: user.name,
//           email: user.email,
//         },
//       });
//     })
//     .catch((err) => {
//       // Handle validation errors
//       if (err.name === "ValidationError") {
//         const messages = Object.values(err.errors).map(
//           (error) => error.message
//         );
//         return res.status(400).send({
//           message: "Validation failed",
//           errors: messages,
//         });
//       }

//       // Handle duplicate email error
//       if (err.code === 11000) {
//         return res.status(400).send({
//           message: "Email already in use",
//         });
//       }

//       // Handle any other errors
//       res.status(500).send({
//         message: "An error occurred while creating the user",
//         error: err.message,
//       });
//     });
// };
