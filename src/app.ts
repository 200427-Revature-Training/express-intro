import express from 'express';
import bodyParser from 'body-parser';

/* 
    Initializes an Express app - the app object is now a higher level object
    that can be used for application configuration 
*/
const app = express();

/* gets PORT environment variable value or 3000 if PORT is not defined */
/* Essentially a port allows for network traffic to routed to our application
for handling.*/
const port = process.env.PORT || 3000;
app.set('port', port);


/* bodyParser middleware provided by the external body-parser dependency 
    Process request body that is sent as json into a object that gets attached
    to request.body. This middleware will only process the body if it is declared
    as MIME type: Content-Type=application/json.

    ? Headers
    Are meta-data about a request or response.  They are a set of key-value pairs
    that specify important information about how the request is formatted or related
    information for processing it. 
*/
app.use(bodyParser.json());


/* 
    ? Middleware - 
    When a request is received by Express, it passes through layers of middleware.
    Each middleware is a function which can access the request object, define
    response information using response, and relay to the next piece of middleware
    by calling the next() function.

    Within express middleware is collected into an array, and requests pass through
    the array index by index.
*/
app.use((request, response, next) => {
    console.log('Request received - processing at middleware 1');
    next();
})


const users = [{
    firstName: 'Abby',
    birthdate: new Date()
}];

/* 
    localhost:3000/users
    responds with an array of users
*/
app.get('/users', (request, response, next) => {
    console.log('Request received - processing at app.get');
    response.json(users);
    next();
})

/*
    Post requests are generally used to create new resources
    Often this means we need to examine the body of the request
*/
app.post('/users', (request, response, next) => {
    console.log(request.body);
    const body = request.body;
    if (body) {
        // add user to our list
        users.push(body);
    }
    console.log('Request received - processing at app.post');
    response.send('Processed by app.post');
    next();
})




// Starts the app, which begins listening on the port
app.listen(port, () => {
    // localhost - is a special designation for a network device
    // localhost - this is a reference to itself (our own machine)
    console.log(`App is listening at http://localhost:${port}`)
});

