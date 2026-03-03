const express = require('express')
const app = express()
const path = require('path')
const { people } = require(path.join(__dirname, '..', '..', 'john-smilga-express.js', 'data.js'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '..', 'john-smilga-express.js', 'methods-public')))

// get
app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})

// post method
app.post('/api/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ seuccess: false, msg: 'Please provide name value' })
    }
    res.status(201).json({ success: true, person: name }) // When performing a post request we send status code - 201
})

// post method
app.post('/api/postman/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ seuccess: false, msg: 'Please provide name value' })
    }
    res.status(201).json({ success: true, data: [...people, name] }) // When performing a post request we send status code - 201
})

// put method
app.put('/api/people/:id', (req, res) => {
    // PUT /api/people/:id means - 'Update the person whose id is provided in the url'
    const { id } = req.params // “Give me the ID of the person to update”
    const { name } = req.body // “Give me the new name that should replace the old one”
    const person = people.find((human) => human.id === Number(id))
    if (!person) {
        return res.status(400).json({ success: false, msg: 'id not found' })
    }
    const newPeople = people.map((human) => {
        if (human.id === Number(id)) {
            human.name = name
        }
        return human
    })
    res.status(200).json({ success: true, data: newPeople })
})

// delete method
app.delete('/api/people/:id', (req, res) => {
    const { id } = req.params
    const person = people.find((human) => human.id === Number(id))
    if (!person) {
        return res.status(400).json({ success: false, msg: `people with id ${id} not found` })
    }
    const newPeople = people.filter(human => human.id !== Number(id)) // human.id !== Number(id) is a boolean condition used inside filter(). It must return true or false. if true keep if false remove
    res.status(200).json({ success: true, data: newPeople })
})

// app.get('/api/people/:id', (req, res)=>{
//     const {id} = req.params
//     console.log(req.params) // { id: '9' } for requested url - http://localhost:5000/api/people/9
//     res.send('hello world')
// })

app.listen(5000, () => {
    console.log("server is listening on port 5000..")
})


/* TO TEST POST PUT AND DELETE REQUEST WE CAN USE POSTMAN -:
enter url in postman
set the method accordingly

if testing post/put method go to body - json - enter json data
click send

if testing delete method just enter the url
*/