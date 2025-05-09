import { validationResult, body, param } from "express-validator";

class chatValidator {
    static validateTextMessage() {
        return [
            body('text')
                .notEmpty().withMessage("Campo da mensagem está vazio")
                .trim().escape(),

            (req, res, next) => {
                const errors = validationResult(req);

                if(!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            }
        ];
    }

    static validateRoom() {
        return [
            param('room')
                .trim().escape(),

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

export default chatValidator;