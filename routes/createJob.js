const express = require("express");
const app = express.Router();
const Model = require('../model/model');

//POST REQUEST 

//add jobs in mongodb
app.post("/add", (req, res) => {


    const addjobs = req.body


    const Jobs = new Model.Jobs(addjobs);
    Jobs.save()
        .then((succes) => {
            res.send(succes)
        })
        .catch(e => res.send({ message: e.message }))
})


//GET REQUEST

//get jobs from mongoDb 
app.get('/get/:uid', (req, res, next) => {

    Model.Jobs.find({ uid: req.params.uid })
        .exec()
        .then((jobs) => {
            res.json(jobs)
        })
        .catch((e) => res.send({ message: e.message }));


});


app.delete("/delete", (req, res) => {
    const id = req.body.jobId

    Model.Jobs.findByIdAndDelete({ _id: id })
        .then(result => res.send(result))
        .catch(e => res.send({ message: e.message }))
})


module.exports = app;