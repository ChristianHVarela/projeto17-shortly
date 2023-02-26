import { urlSchemma } from '../schemas/url.schemmas.js'
import db from '../config/database.config.js'

export const urlValidator = (req, res, next) => {
    const { url } = req.body
    if (url){
        const { error } = urlSchemma.validate({url})
        if (error){
            const errors = error.details.map(e => { return e.message })
            return res.status(422).send(errors)
        }
        next()
    } else {
        return res.status(422).send()
    }
}

export const urlExists = async (req, res, next) => {
    const { shortUrl } = req.params
    try {
        const shorten = await db.query('SELECT * FROM shorten WHERE "shortUrl" LIKE $1', [shortUrl])
        if (shorten.rowCount === 0){
            return res.status(404).send()
        }
        res.locals.shorten = shorten.rows[0]
    } catch (error) {
        console.log(error);
    }
    next()
}