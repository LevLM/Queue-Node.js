// Impelement Queue in JavaScript (array of users)
// Support these methods via RestAPI, assume (and check that all elements are strings)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const myQueue = [];

app.post('/newElement', (req, res) => {
    const addNewElement = req.body.user
    console.log(addNewElement)
    if (typeof addNewElement == 'string') {
        myQueue.push(addNewElement);
        res.json()
        console.log(myQueue)
    } else {
        console.log('type error')
        res.status(400).json('type error')
    }
});

app.delete('/remove', (req, res) => {
    if (myQueue.length == 0) {
        res.json("Queue Is Empty")
        return "Queue Is Empty"
    }
    const pop = myQueue[0]
    myQueue.splice(0, 1);
    console.log(pop, ' deleted from queue')
    res.json(pop + ' deleted from queue, in queue now ' + myQueue.length + ' elements')
    console.log(myQueue)
});

app.get('/top', (req, res) => {
    if (myQueue.length == 0) {
        res.json("Queue Is Empty")
        return "Queue Is Empty"
    }
    const peek = myQueue[0]
    console.log(peek, ' is top element of queue')
    res.json(peek + ' is top element of queue');
    console.log(myQueue)
});

app.get('/size', (req, res) => {
    if (myQueue.length == 0) {
        res.json("Queue Is Empty")
        return "Queue Is Empty"
    }
    const length_queue = myQueue.length
    console.log('Size of queue is ', length_queue)
    res.json('Size of queue is ' + length_queue);
    console.log(myQueue)
});

app.listen(5000, () => {
   console.log('server started');
   
});

module.exports = app

// Task:
// Insert/remove/peek/size
// Insert → `addNewElement` Add an element to the queue.  //POST 
// Remove → `deleteElement` Delete an element from the queue.  //DELETE
// Peek → Get the top element of the queue. //GET
// Size → Return the length of the queue. //GET



// Checking

// Create new element throw curl:
// curl -X POST -H "Content-Type: application/json" -d '{"user": "Shlomo"}' http://localhost:5000/newElement
// curl -X POST -H "Content-Type: application/json" -d '{"user": "Haim"}' http://localhost:5000/newElement

// Delete element throw curl:
// curl -X DELETE http://localhost:5000/remove

// Get top throw curl:
// curl -X GET http://localhost:5000/top

// curl -X GET http://localhost:5000/size
