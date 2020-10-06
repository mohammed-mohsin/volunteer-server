const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const ObjectId = require('mongodb').ObjectId;

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://myDB:Mohsin0725@cluster0.4trjz.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";



const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 5000;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const eventsCollection = client.db("volunteerNetwork").collection("events");
    const registrationCollection = client.db("volunteerNetwork").collection("registration");



    app.get('/events', (req, res) => {
        eventsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)

            })
    })


    app.post('/registration', (req, res) => {
        const registration = req.body;
        // console.log(registration)

        registrationCollection.insertOne(registration)
            .then(result => {
                res.send(result.insertedCount > 0)
                // console.log(result)

            })
    })


    app.post('/events', (req, res) => {
        const addEvent = req.body;
        // console.log(registration)
        eventsCollection.insertOne(addEvent)
            .then(result => {
                res.send(result.insertedCount > 0)
                // console.log(result)

            })
    })


    app.get('/registration', (req, res) => {
        registrationCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })



    app.delete('/delete/:id', (req, res) => {
        registrationCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.send(result.deletedCount > 0)


            })
    })

    app.get('/registration', (req, res) => {

        registrationCollection.find({ email: req.query.email })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.get





});

app.listen(process.env.PORT || port)

