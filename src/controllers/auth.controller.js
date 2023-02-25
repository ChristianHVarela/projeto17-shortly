import db from '../config/database.config.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export const signUpController = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const passwordCrypt = bcrypt.hashSync(password, 10)
        await db.query("INSERT INTO users(user_name, email, password) VALUES ($1, $2, $3)", [name, email, passwordCrypt])
    } catch (error) {
        console.log();
    }
    return res.status(201).send()
}

export const signInController = async (req, res) => { 
    const { password } = req.body
    const user = res.locals.user
    const passwordIsCorrect = bcrypt.compareSync(password, user.password)
    console.log(`user.password: ${user.password}  password: ${password}  compare: ${passwordIsCorrect}`);
    if (!passwordIsCorrect){
        return res.status(401).send()
    }
    const timeValidation = new Date(new Date().getTime() + (30 * 60000))
    const token = uuid()
    try {
        await db.query("INSERT INTO token_validation(token, expiration_date, user_id) VALUES ($1, $2, $3)", [token, timeValidation, user.id])
        return res.send({token})
    } catch (error) {
        console.log(error);
    }
    
}