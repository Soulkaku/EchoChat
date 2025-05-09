import { body, validationResult } from "express-validator"

class loginValidators {
    static validateName() {
        return [
            body('name')
            .notEmpty().withMessage("Campo nome está vazio").trim().escape(),

            (req, res, next) => {
                const result = validationResult(req);

                if(!result.isEmpty()) {
                    return res.status(400).json({ errors : result.array() });
                }
                next();
            }

        ]
    }
}

export default loginValidators;