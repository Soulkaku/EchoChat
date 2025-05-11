import { body, validationResult } from "express-validator"

class loginValidators {
    static validateUser() {
        return [
            body('name')
            .notEmpty().withMessage("Campo nome está vazio").trim().escape(),

            (req, res, next) => {
                const errors = validationResult(req);

                if(!errors.isEmpty()) {
                    return res.status(400).json({ errors : errors.array() });
                }
                next();
            }
        ];
    }
}

export default loginValidators;