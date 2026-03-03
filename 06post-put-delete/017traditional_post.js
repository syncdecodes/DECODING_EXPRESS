const express = require('express')
const app = express()
const path = require('path')
const { people } = require(path.join(__dirname, '..', '..', 'john-smilga-express.js', 'data.js'))

app.use(express.urlencoded({ extended: false })) // app.use(express.urlencoded()) is middleware in Express that lets your server read data sent from HTML forms
// express.urlencoded({extended: false}) uses Node.js built in querystring library and can handle only simple key value pairs.
// express.urlencoded({extended: true}) uses the qs library and ca handle nested objects and arrays

app.use(express.static(path.join(__dirname, '..', '..', 'john-smilga-express.js', 'methods-public')))

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})

app.post('/login', (req, res) => {
    const { name } = req.body // object destructuring - const name = req.body.name

    if (name) {
        console.log(name)
        return res.status(200).send(`Welcome ${name}`)
    }

    res.status(401).send('Please enter credentials')
})

app.post('/login2', (req, res) => {
    const { username, password } = req.body

    if (username && password) {
        console.log(req.body)
        return res.status(200).send(`Welcome ${username} your password is ${password}`)
    }

    res.status(401).send('Please enter all the credentials')
})

app.listen(5000, () => {
    console.log("server is listening on port 5000..")
})

/* we can't just simply configure our browser to perform post request 
hence we use tools like - postman, axios, thunder client*/