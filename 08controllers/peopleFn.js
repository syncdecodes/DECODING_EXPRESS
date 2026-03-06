const path = require('path')
const { people } = require(path.join(__dirname, '..','..', 'john-smilga-express.js', 'data.js'))

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people })
}

const createPerson = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide name value' })
    }
    res.status(201).json({ success: true, person: name }) // When performing a post request we send status code - 201
}

const createPersonPostman = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ seuccess: false, msg: 'Please provide name value' })
    }
    res.status(201).json({ success: true, data: [...people, name] }) // When performing a post request we send status code - 201

}

const updatePerson = (req, res) => {
    const { id } = req.params
    const { name } = req.body
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
}

const deletePerson = (req, res) => {
    const { id } = req.params
    const person = people.find((human) => human.id === Number(id))
    if (!person) {
        return res.status(400).json({ success: false, msg: `people with id ${id} not found` })
    }
    const newPeople = people.filter(human => human.id !== Number(id))
    res.status(200).json({ success: true, data: newPeople })
}

module.exports = {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
}