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

export const getRanking = async (req, res) => {
    try {
        const rankings = await db.query('SELECT s.user_id AS id, u.user_name AS name, count(s) AS linksCount, sum(s."visitCount") AS "visitCount" FROM shorten s JOIN users u ON u.id = s.user_id GROUP BY s.user_id, u.id ORDER BY "visitCount" DESC LIMIT 10')
        return res.send(rankings.rows)
    } catch (error) {
        console.log(error);
    }
}

export const getUrlsInUser = async (req, res) => {
    const { user_id } = res.locals.token
    try {
        const userInfo = await db.query('SELECT u.id AS id, u.user_name AS name, SUM(s."visitCount") AS "visitCount" FROM shorten s JOIN users u ON u.id = s.user_id WHERE u.id = $1 GROUP BY s.user_id, u.id', [user_id])
        const shortsUrl = await db.query('SELECT id, "shortUrl", url, "visitCount" FROM shorten WHERE user_id = $1 ORDER BY id ASC', [user_id])
        const newReturn = {...userInfo.rows[0], shortenedUrls: shortsUrl.rows}
        return res.status(200).send(newReturn)
    } catch (error) {
        console.log(error);
    }
}