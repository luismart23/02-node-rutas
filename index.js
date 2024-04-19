import express from 'express'
import { authMiddleware } from './middlewares/auth.middleware.js'

const app = express()

// ruta absoluta
const __dirname = import.meta.dirname;

console.log(__dirname)

// middlewares
app.use(express.static(__dirname + '/public'))


// enrutamiento 
app.get('/', (req, res) => {
    res.status(200).json({ method: 'GET' })
})

const products = [
    {
        id: 1,
        name: 'product 1',
    },
    {
        id: 2,
        name: 'product 2',
    },
    {
        id: 3,
        name: 'product 3',
    }
]

app.get('/products', (req, res) => {
    return res.json(products)
})

app.get('/product/:id', (req, res) => {

    // destructuring de objetos
    // const { id } = req.params
    const id = req.params.id

    const product = products.find(item => item.id === +id)

    if (!product) {
        return res.status(404).json({ msg: 'no se encontro el producto' })
    }

    return res.json(product)
})

app.get('/latam', (req, res) => {
    res.redirect('https://desafiolatam.com/react/')
})

app.get('/user', authMiddleware, (req, res) => {
    const user = { id: 1, name: 'user1', password: '123123' }
    res.json(user)
})

app.post('/', (req, res) => {
    res.status(201).json({ method: 'POST' })
})

app.put('/', (req, res) => {
    res.json({ method: 'PUT' })
})

app.delete('/', (req, res) => {
    res.json({ method: 'DELETE' })
})


// middleware
app.use('*', (req, res) => {
    res.status(404).json({ error: 404 })
})


// levantar el servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`)
})