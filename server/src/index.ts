import express, { Request, Response } from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Deck from './models/Deck'
import cors from 'cors'

const app = express()
const PORT = 5000
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(cors({
    origin: "*"
}))


app.get(`/`, (req: Request, res: Response) => {
    res.status(200).send(`Server is Healthy`)

})


app.get(`/deck`, async (req: Request, res: Response) => {
    try {
        const deckData = await Deck.find()
        res.status(200).json({ hasError: false, data: deckData })
    } catch (err) {
        if (err) {
            res.status(500).json({ hasError: true, message: `Internal Server Error` })
        }
    }

})



app.get(`/deck/:deckId`, (req: Request, res: Response) => {
    const { deckId } = req.params
    // Deck.find({}).then(data=> console.log(data))
    Deck.findById(deckId).exec((err, deck) => {
        if (err) {
            return res.status(500).json({ hasError: true, error: { message: `internal Server Error has been occurred ` } })
        } else if (!deck) {
            return res.status(404).json({ hasError: true, error: { message: `Not Found` } })
        }
        res.status(200).json(deck)
    })
})

app.delete(`/deck/:deckId`, (req, res) => {
    const { deckId } = req.params
    Deck.findByIdAndDelete(deckId).exec((err, deck) => {
        if (err) {
            return res.status(500).json({ hasError: true, message: `Internal Server Error` })
        } else if (!deck) {
            return res.status(404).json({ hasError: true, message: `Not Found` })
        }

        res.status(200).json({ hasError: false, data: deck })
    })
})

app.post(`/deck`, async (req: Request, res: Response) => {
    try {
        const { title, author } = req.body
        const createDeck = new Deck({
            title,
            author,
            test: `hefjejf kwebfkwejfkwjbefkwjebf`
        })

        const createdDeck = await createDeck.save()
        const { title: _title, author: _author } = createdDeck

        res.status(201).json({ hasError: false, data: { _title, _author } })
    }
    catch {
        res.status(500).json({ hasError: true, message: `Something went wrong` })
    }

})

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://hussnainjav3d:ffTBfjjSwqluxr7x@deck-card.wajwo3m.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(PORT, () => console.log(`Server is listen on ${PORT}`))
})
