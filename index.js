const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    fs.readdir(path.join(__dirname, '/notes'), (error, notes) => {
        if (error) {
            console.log(error)
        } else {
            res.render("index", { notes: notes })
        }
    })
})

app.get("/notes/:sample", (req, res) => {
    const title = req.params.sample

    fs.readFile(`./notes/${title}`, (error, notes) => {
        if (error) {
            console.log(error)
        } else {
            res.render("details", { title: title, subject: notes.toString() })
        }
    })
})

app.post("/create", (req, res) => {
    const title = req.body.title
    const subject = req.body.subject

    fs.writeFile(`./notes/${title.split(' ').join('')}.txt`, subject, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            res.redirect("/")
        }
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})