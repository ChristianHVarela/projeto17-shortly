import { signinSchemma, signupSchemma } from '../schemas/auth.schemas.js'
import db from '../config/database.config.js'

export const signupValidator = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    const { error } = signupSchemma.validate({name, email, password, confirmPassword})
    if (error){
        const errors = error.details.map(e => { return e.message })
        return res.status(422).send(errors)
    }
    try {
        const userValidation = await db.query("SELECT * FROM users WHERE email LIKE $1", [email])
        if (userValidation.rowCount > 0){
            return res.status(409).send(email)
        }
    } catch (error) {
        console.log(error);
    }
    next()
}

export const signinValidator = async (req, res, next) => {
    const { email, password } = req.body
    const { error } = signinSchemma.validate({email, password})
    if (error){
        const errors = error.details.map(e => { return e.message })
        return res.status(422).send(errors)
    }
    try {
        const userValidation = await db.query("SELECT * FROM users WHERE email LIKE $1", [email])
        if (userValidation.rowCount != 1){
            return res.status(401).send()
        } else {
            res.locals.user = userValidation.rows[0]
        }
    } catch (error) {
        console.log(error);
    }
    next()
}