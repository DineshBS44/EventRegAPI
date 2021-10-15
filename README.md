# EventReg Backend

- [Click here](https://github.com/DineshBS44/Event-Registration) to view the main Github repo for the Android App

# Working

The API is built using `Node.js` and `Express.js`. After testing the endpoints on the local server, the Backend API is deployed to Heroku which is a Cloud platform run by Salesforce. The App is deloyed on Heroku once it is connected to the Github repository.

## Endpoints

- `book_event/` endpoint receives user's email, phone number and eventID to register for an event.

- `booked_events/` endpoint receives user's email and phone number to send back the details of the events that are registered by the user.

- `events_not_booked/` endpoint similarly receives user's email and phone number to send back the details of the events that are not registered by the user.

## Libraries/services used

* **Node.js** - To build the API
* **Express.js** - For configuring the API endpoints
* **Heroku** - To deploy the API

## Developer
* **Dinesh B S** [(@DineshBS44)](https://github.com/DineshBS44)

## License
Licensed under MIT License :  https://opensource.org/licenses/MIT

<br>
<br>