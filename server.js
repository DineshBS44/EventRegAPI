import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Array of all the events
var events = new Array();

events.push(["Name 1", "Date & Time", "Place" , "0"]);
events.push(["Name 1", "Date & Time", "Place" , "1"]);
events.push(["Name 1", "Date & Time", "Place" , "2"]);
events.push(["Name 1", "Date & Time", "Place" , "3"]);
events.push(["Name 1", "Date & Time", "Place" , "4"]);
events.push(["Name 1", "Date & Time", "Place" , "5"]);
events.push(["Name 1", "Date & Time", "Place" , "6"]);
events.push(["Name 1", "Date & Time", "Place" , "7"]);
events.push(["Name 1", "Date & Time", "Place" , "8"]);
events.push(["Name 1", "Date & Time", "Place" , "9"]);

// All the booked users are stored in this HashMap
var usersBooked = new Map();

app.get('/book_event', async (req, res) => {    
    const email = req.query.email;  
    const phone_number = req.query.phone_number;
    const eventId = req.query.eventId;
    let str = email+","+phone_number;
    if(usersBooked.has(str)) {
        usersBooked.get(str).add(eventId);
    } else {
        let se = new Set();
        se.add(eventId);
        usersBooked.set(str, se);
    }
    console.log("email: " + email);
    var str1 = email + " " + phone_number + " " + eventId + " Booked successfully";
    console.log("phNo: " + phone_number);  
    var sendData = {
        str1
    };
    res.end(JSON.stringify(sendData));  
 });

 app.get('/booked_events', async (req, res) => {    
    const email = req.query.email;  
    const phone_number = req.query.phone_number;
    var arr = new Array();
    let str = email+","+phone_number;
    if(usersBooked.has(str)) {
        usersBooked.get(str).forEach((v) => {
            arr.push(events[v]);
        });
    }
    console.log("email: " + email);
    console.log("phNo: " + phone_number);  
    var sendData = {
        arr
    };
    res.end(JSON.stringify(sendData));  
 });

 app.get('/events_not_booked', async (req, res) => {    
    const email = req.query.email;  
    const phone_number = req.query.phone_number;
    var arr = new Array();
    let str = email+","+phone_number;
    if(usersBooked.has(str)) {
        var se = usersBooked.get(str);
        for(var i = 0; i < 10; i++) {
            if(!se.has(i.toString())) {
                arr.push(events[i]);
            }
        }
    } else {
        arr = events;
    }
    console.log("email: " + email);
    console.log("phNo: " + phone_number);  
    var sendData = {
        arr
    };
    res.end(JSON.stringify(sendData));  
 });

app.listen(port, () => {
    console.log(`app listening at port: ${port}`);
});