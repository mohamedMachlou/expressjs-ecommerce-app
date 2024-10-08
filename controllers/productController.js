const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const Joi = require("joi");
const product = require("../models/product");

///////////////////////////////////////////////////////////////////////
///////// Start Create Product          ///////////////////////////////
///////////////////////////////////////////////////////////////////////
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
    // Convert fields
    const convertedFields = {};
    for (let key in fields) {
      if (Array.isArray(fields[key])) {
        convertedFields[key] = fields[key][0];
      } else {
        convertedFields[key] = fields[key];
      }
    }
    fields = convertedFields;
    //////////////////////////////////////////////////////////////////////////////////////////
    // Read the file as a buffer
    fs.readFile(files.photo[0].filepath, (err, data) => {
      if (err) {
        return res.status(400).send("Error reading the file: ");
      }

      //////////////////////////////////////////////////////////////////////////////////////////
      ////////   Validation Data by Joi                       //////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////
      //   Joi schema for validation
      const schema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().max(2000).required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        category: Joi.string().required(), // Expecting category as ObjectId string
        shipping: Joi.boolean(),
        photo: Joi.object({
          size: Joi.number().max(2000000), // 2MB limit
          mimetype: Joi.string().valid("image/jpeg", "image/png"), // Allow only specific mime types
        }),
      });

      // Extract the photo properties for validation
      const photoData = {
        size: files.photo.size,
        mimetype: files.photo.mimetype,
      };

      //////////////////////////////////////////////////////////////////////////////////////////
      //////////// Validation by Joi
      // Merge fields and photoData for validation
      let payload = { ...fields, photo: photoData };

      let { error } = schema.validate(payload);

      if (error) {
        return res.status(400).json({
          error: "Exist error on Joi Val",
          errMessage: error.details[0].message,
        });
      }
      //////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////
      // Create a new Product document
      const newProduct = new Product({
        name: fields.name,
        description: fields.description,
        price: fields.price,
        quantity: fields.quantity,
        category: fields.category, // Assuming this is an ObjectId string
        shipping: fields.shipping,
        photo: {
          data: data,
          contentType: files.photo.mimetype,
        },
      });

      //////////////////////////////////////////////////////////////////////////////////////////
      //////////// Validation by Joi
      //   let { error } = schema.validate(fields);

      //   if (error) {
      //     return res.status(400).json({
      //       error: "Exist error on Joi Validation",
      //       errMessage: error.details[0].message,
      //     });
      //   }
      //////////////////////////////////////////////////////////////////////////////////////////

      // Saving the product to the database
      newProduct
        .save()
        .then(() =>
          res.json({
            newProduct,
          })
        )
        .catch((err) => {
          res.status(400).json({
            error: "Product could not be saved!",
            newProduct,
          });
        });
    });
  });
};
///////////////////////////////////////////////////////////////////////
/////////   End Create Product          ///////////////////////////////
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
///////// Start Get Product             ///////////////////////////////
///////////////////////////////////////////////////////////////////////

// exports.getProductById = (req, res, next, id) => {
//   Product.findById(id)
//     .then((product) => {
//       if (!product) {
//         return res.json({
//           error: "Product Not Found",
//         });
//       }
//       (req.product = product), next();
//     })
//     .catch((err) => {
//       if (err) {
//         return res.json({
//           error: "Product Not Found",
//         });
//       }
//     });
// };

exports.showProductById = (req, res) => {
  return res.json({
    product: req.product,
  });
};
///////////////////////////////////////////////////////////////////////
///////// End  Get Product              ///////////////////////////////
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
///////// Start Delete Product              ///////////////////////////
///////////////////////////////////////////////////////////////////////
exports.removeProduct = (req, res) => {
  let product = req.product;
  product
    .deleteOne()
    .then(() => res.json({ message: "Product Deleted !!! " }))
    .catch((err) =>
      res.json({
        error: "Product Not Deleted !!! ",
      })
    );
};
///////////////////////////////////////////////////////////////////////
///////// End Delete Product                ///////////////////////////
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
///////// Start Update Product              ///////////////////////////
///////////////////////////////////////////////////////////////////////
exports.updateProduct = (req, res) => {
  let product = req.product;

  let form = new formidable.IncomingForm();

  form.keepExtensions = true; // Preserve file extensions

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded!",
      });
    }
    //////////////////////////////////////////////////////////////////////////////////////////
    // Convert fields
    const convertedFields = {};
    for (let key in fields) {
      if (Array.isArray(fields[key])) {
        convertedFields[key] = fields[key][0];
      } else {
        convertedFields[key] = fields[key];
      }
    }

    (product.name = convertedFields.name),
      (product.description = convertedFields.description),
      (product.quantity = convertedFields.quantity),
      (product.price = convertedFields.price);

    // console.log("update is ok");
    // res.json({
    //   myProduct: product,
    //   myFields: convertedFields,
    // });
  });

  // Saving the product to the database
  product
    .save()
    .then(() =>
      res.json({
        message: "Product saved Successfully !!",
        product,
      })
    )
    .catch((err) => {
      res.status(400).json({
        error: "Product could not be saved!",
        product,
      });
    });
};

///////////////////////////////////////////////////////////////////////
///////// End Update Product                ///////////////////////////
///////////////////////////////////////////////////////////////////////
