import { nanoid } from "nanoid"
import db from '../config/database.config.js'

export const createShorten = async (req, res) => {
    const { url } = req.body
    const { user_id } = res.locals.token
    const shorten = nanoid()
    try {
        const save = await db.query('INSERT INTO shorten(url, "shortUrl", user_id) VALUES ($1, $2, $3)', [url, shorten, user_id])
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

export const useShorten = async (req, res) => {
    const { id, visitCount, url } = res.locals.shorten
    try {
        const newVisitCount = visitCount + 1
        await db.query('UPDATE shorten SET "visitCount" = $1 WHERE id = $2', [newVisitCount, id])
        res.redirect(url)
    } catch (error) {
        console.log(error);
    }
}

export const deleteShorten = async (req, res) => {
    const { user_id } = res.locals.token
    const { id } = req.params
    try {
        const shortenSave = await db.query('SELECT * FROM shorten WHERE id = $1', [id])
        if (shortenSave.rowCount === 0){
            return res.status(404).send()
        }
        const shorten = shortenSave.rows[0]
        if (user_id !== shorten.user_id){
            return res.status(401).send()
        }
        await db.query('DELETE FROM shorten WHERE id = $1', [id])
        return res.status(204).send()
    } catch (error) {
        console.log(error);
    }
}