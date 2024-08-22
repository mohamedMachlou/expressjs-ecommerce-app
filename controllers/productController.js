// const Product = require("../models/product");
// const formidable = require("formidable");
// const fs = require("fs");

// exports.createProduct = (req, res) => {
//   let form = new formidable.IncomingForm();

//   form.keepExtensions = true;

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Image could not uploaded !!!",
//       });
//     }

//     let product = new Product(fields);

//     if (files.photo) {
//       product.photo.data = fs.readFileSync("files.photo.path");
//       product.photo.contentType = files.photo.type;
//     }

//     photo
//       .save()
//       .then((product) => {
//         res.json({
//           product,
//         });
//       })
//       .catch((err) => {
//         res.ststus(400).json({
//           error: "Product not persist !!!",
//         });
//       });
//   });
// };

const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true; // Preserve file extensions

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded!",
      });
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    // Read the file as a buffer
    fs.readFile(files.photo[0].filepath, (err, data) => {
      if (err) {
        return res.status(400).send("Error reading the file: ");
      }
      //   res.json({
      //     // files,
      //     fieldsName1: fields["name"],
      //     fieldsName2: `${fields.name[0]}`,
      //   });

      // Create a new Product document
      const newProduct = new Product({
        name: `${fields.name[0]}`,
        description: `${fields.description[0]}`,
        price: `${fields.price[0]}`,
        quantity: `${fields.quantity[0]}`,
        category: fields.category, // Assuming this is an ObjectId string
        shipping: fields.shipping,
        photo: {
          data: data,
          contentType: files.photo.mimetype,
        },
      });

      // Saving the product to the database
      newProduct
        .save()
        .then(() => res.send(newProduct))
        .catch((err) => {
          res.status(400).json({
            error: "Product could not be saved!",
            newProduct,
          });
        });
    });
    //////////////////////////////////////////////////////////////////////////////////////////
  });
};
