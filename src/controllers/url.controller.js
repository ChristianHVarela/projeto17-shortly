import { nanoid } from "nanoid"
import db from '../config/database.config.js'

export const createShorten = async (req, res) => {
    const { url } = req.body
    const shorten = nanoid()
    try {
        const save = await db.query('INSERT INTO shorten(url, "shortUrl") VALUES ($1, $2)', [url, shorten])
        if (save.rowCount === 1){
            const short = await db.query('SELECT * FROM shorten WHERE "shortUrl" LIKE $1', [shorten])
            const { id, shortUrl } = short.rows[0]
            return res.status(201).send({id, shortUrl})
        } else {
            return res.status(422).send()
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUrl = async (req, res) => {
    const { id } = req.params
    try {
        const short = await db.query('SELECT * FROM shorten WHERE id = $1', [id])
        if (short.rowCount > 0){
            const { id, shortUrl, url } = short.rows[0]
            return res.send({id, shortUrl, url})
        } else {
            return res.status(404).send()
        }
    } catch (error) {
        console.log(error);
    }
}