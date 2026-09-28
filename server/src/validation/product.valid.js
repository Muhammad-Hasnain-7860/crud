import { body, validationResult } from "express-validator";

export const productCreateValidator = [
  body("title")
    .exists()
    .withMessage("Title is Required")
    .bail()
    .isString()
    .withMessage("title must be a string")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("Length must be between 2 and 100 characters")
    .bail()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Only alphabets and spaces are allowed"),
  body("description")
    .exists()
    .withMessage("Description is Required")
    .bail()
    .isLength({ min: 20, max: 500 })
    .withMessage("Length must be between 2 and 100 characters")
    .bail()
    .isString()
    .withMessage("description is must be a String"),
  body("sizes")
    .exists()
    .withMessage("Sizes is Required")
    .bail()
    .isArray()
    .withMessage("Sizes Must be an array"),
  body("sizes.*.size")
    .exists()
    .withMessage("Size is required")
    .bail()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Size must be XS, S, M, L, XL, or XXL"),
  body("sizes.*.stock")
    .exists()
    .withMessage("stock is Required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Size must be a number"),
  body("sizes.*.price")
    .exists()
    .withMessage("Price is Required")
    .bail()
    .isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  body('currency')
    .exists().withMessage('currency is Required')
    .bail()
   .isIn(['PKR', 'USD', 'EUR'])
.withMessage('Currency must be PKR, USD, or EUR'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "invalid data",
        errors: errors.array(),
      });
    }

    next();
  },
];
