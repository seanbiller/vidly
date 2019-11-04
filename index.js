const express = require('express')
const Joi = require('@hapi/joi')
const bodyParser = require('body-parser')
const genres = require('./genres.json')
const app = express()


app.use(bodyParser.json())
// app.use(express.json())


app.get('/genres', (request, response) => {
    response.send(genres)
})

app.get('/genres/:placeholder', (request, response) => {
    const result = genres.filter((genre) => {
        const filter = request.params.placeholder
        return genre.id == filter || genre.name == filter
    })
    response.send(result)
})

app.get('*', (request, response) => {
    response.sendStatus(404)
    console.log('404 Page not found')
})

app.post('/genres', (request, response) => {
    const { error } = schema.validate({
        name: request.body.name,
        movie: request.body.movie
        })    
    if (error) {
         response.status(400).send(error.details[0].message)
         return
    }
    const genre = {
        id: genres.length + 1,
        name: request.body.name,
        movie: request.body.movie
    }
    genres.push(genre)
    response.send(genre)
})

app.put('/genres/:placeholder', (request, response) => {
    const genre = genres.find(c => c.id === parseInt(request.params.placeholder))
    if (!genre) {
        response.status(404).send('The genre with that id was not found')
        return
    }
    const { error } = schema.validate({
        name: request.body.name,
        movie: request.body.movie
        })
    if (error) {
        response.status(400).send(error.details[0].message)
        return
    }
    genre.name = request.body.name
    genre.movie = request.body.movie
    response.send(genre)
})

app.delete('/genres/:placeholder', (request, response) => {
    const genre = genres.find(c => c.id === parseInt(request.params.placeholder))
    if (!genre) {
        response.status(404).send('The genre with that id was not found')
        return
    }
        const index = genres.indexOf(genre)
        genres.splice(index, 1)
        
        response.send(genre)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

const schema = Joi.object().keys({
    name: 
        Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .required(),
    movie: 
        Joi.string()
        .alphanum()
        .min(1)
        .max(25),
    })
