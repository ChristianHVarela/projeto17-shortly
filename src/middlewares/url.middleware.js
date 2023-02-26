import { urlSchemma } from '../schemas/url.schemmas.js'

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