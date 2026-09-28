import { body, validationResult } from "express-validator";

export const registerValidation = [
    body('name')
        .exists().withMessage('Name is Required').bail()
        .isString().withMessage('Name must be a String').bail()
        .isLength({min : 3 , max : 50}).withMessage('Message must be between 3 and 50 characters long'),
    body('email')
        .exists().withMessage('Email is Required').bail()
        .isString().withMessage('email must be a String').bail()
        .isEmail().withMessage('invalid Email').bail()
        .isLowercase().withMessage('email must be a lowerCase'),
    body('password')
        .exists().withMessage('Password is Required').bail()
        .isLength({min : 6}).withMessage('password must be 6 character long').bail()
        .isString().withMessage('password must be a String'),
    body('confirmPassword')
        .exists().withMessage('confirmPassword is Required').bail()
        .isLength({min : 6}).withMessage('confirmPassword must be 6 character long').bail()
        .isString().withMessage('confirmPassword must be a String'),

    (req , res , next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
          return  res.status(400).json({
                message  : 'invalid data',
                errors : errors.array()
            })
        }

        next()
    }
]

export const loginValidator = [
    body('email')
        .exists().withMessage('Email is Required').bail()
        .isEmail().withMessage('invalid Email').bail()
        .isString().withMessage('email must be a string').bail()
        .isLowercase().withMessage('email must be a lowerCase'),

    body('password')
        .exists().withMessage('Password is Required')
        .isString().withMessage('password must be a String')
        .isLength({min: 6}).withMessage('password must be 6 character long'),

    (req , res , next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message : 'invalid data',
                errors : errors.array()
            })
        }

        next()
    }
]