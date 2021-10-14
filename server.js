import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Array of all the events
var events = new Array();

events.push(["Front Row Open Mics", "21st October, 2021", "Bengaluru" , "0", "https://in.bookmyshow.com/events/frontrow-open-mics/ET00313611"]);
events.push(["The Laugh Store", "24th October, 2021", "Mumbai" , "1", "https://in.bookmyshow.com/events/the-laugh-store/ET00301197"]);
events.push(["The Lineup", "31st October, 2021", "Chennai" , "2", "https://in.bookmyshow.com/events/the-lineup-ft-by-nishant-suri-onkar-yadav-rohit/ET00313888"]);
events.push(["Please Interrupt", "2nd November, 2021", "Kochi" , "3", "https://in.bookmyshow.com/events/please-interrupt-by-nishant-tanwar/ET00315942"]);
events.push(["Uncommon Sense", "4th November, 2021", "Bengaluru" , "4", "https://in.bookmyshow.com/events/uncommon-sense-with-jeeveshu-ahluwalia/ET00314791"]);
events.push(["The Next Big Thing", "6th November, 2021", "Gurgaon" , "5", "https://in.bookmyshow.com/events/the-next-big-thing-standup-comedy-open-mic/ET00315769"]);
events.push(["Tried n Tested", "8th November, 2021", "Chennai" , "6", "https://in.bookmyshow.com/events/tried-n-tested-a-standup-comedy-show/ET00315313"]);
events.push(["Central Club of Comedy", "24th November, 2021", "Delhi" , "7", "https://in.bookmyshow.com/events/central-club-of-comedy/ET00307841"]);
events.push(["Guide to the Galaxy", "5th December, 2021", "Bengaluru" , "8", "https://in.bookmyshow.com/events/guide-to-the-galaxy-stand-up-by-mohd-suhel/ET00315632"]);
events.push(["Why so serious", "13th December, 2021", "Chennai" , "9", "https://in.bookmyshow.com/events/why-so-surious-by-nishant-suri/ET00308964"]);

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
    console.log("email: " + email); // Checking if the email is correct
    var str1 = email + " " + phone_number + " " + eventId + " Booked successfully";
    console.log("phNo: " + phone_number);  
    var objects = new Array();
    var objects = new Array();
    var obj = {
        "name":"The Comedy Club",
        "time":"30th April, 2021",
        "place":"Arangum",
        "eventId":"2",
        "link":"https://in.bookmyshow.com/events/central-club-of-comedy/ET00307841"
    };
    objects.push(obj);
    var sendData = {
        objects
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
    
    var objects = new Array();
    for(var i = 0; i < arr.length; i++) {
        var obj = {
            "name":arr[i][0],
            "time":arr[i][1],
            "place":arr[i][2],
            "eventId":arr[i][3],
            "link":arr[i][4]
        };
        objects.push(obj);
    }
    var sendData = {
        objects
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
    var objects = new Array();
    for(var i = 0; i < arr.length; i++) {
        var obj = {
            "name":arr[i][0],
            "time":arr[i][1],
            "place":arr[i][2],
            "eventId":arr[i][3],
            "link":arr[i][4]
        };
        objects.push(obj);
    }
    var sendData = {
        objects
    };
    res.end(JSON.stringify(sendData));  
 });

app.listen(port, () => {
    console.log(`app listening at port: ${port}`);
});