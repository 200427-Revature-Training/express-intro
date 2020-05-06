import express, { Router } from 'express';
/*
    In a RESTful application, we are generally concerned about resources.
    In our application 'user' might be a resource, so any interaction regarding
    users would be accessible through a '/users' endpoint.

    To help organize this structure, we often break down our middleware 
    declarations for routing into a individual routers that can be treated in
    a more modular way.  This file represents a module related to routing and 
    processing of requests related to users - meaning any resource context that
    begins with '/users'

    For setup, we need to:
    1. Define the router using express.Router()
    2. Define routes or middleware functions.
    3. Export the router.
    4. Use the router in the app object in app.ts to register the router.
*/

const userRouter = express.Router();
const route = '/users';

const userMiddleware: [string, Router] = [route, userRouter];

const users = [{
    id: 1,
    firstName: 'Abby',
    birthdate: new Date()
}];


userRouter.get('', (request, response, next) => {
    console.log('Request received - processing at app.get');
    response.json(users);
    next();
});

userRouter.get('/firstName/:name', (request, response, next) => {
    const name = request.params.name;
    const matchedUsers = users.filter((user) => user.firstName === name);
    // user found with that id
    response.json(matchedUsers);
    next();
});

/*
    A route parameter represents a variable that is part of the requested
    route.  Route parameters can be defined by an initial colon (:) followed
    by the parameter name.  The value can then be retrieved from the 
    request.params object using the parameter name. Note: The parameter will
    come in as a string - if you need a number, you will need to parse the string.
*/
// http://localhost:3001/users/1 -> Abby
userRouter.get('/:id', (request, response, next) => {
    const id = parseInt(request.params.id);
    const user = users.filter((users) => users.id === id)[0];
    if (!user) {
        // nothing found with that id
        response.sendStatus(404);
    } else {
        // user found with that id
        response.json(user);
    }
    next();
});

userRouter.post('', (request, response, next) => {
    console.log(request.body);
    const body = request.body;

    // Find user with highest ID value, then assign a number one greater
    body.id = users.reduce((a, b) => a.id > b.id ? a : b).id + 1;

    if (body && body.firstName) {
        // add user to our list
        users.push(body);
    }

    console.log('Request received - processing at app.post');
    // How to set a status - NOTE: status must be set before calling send/json
    response.status(201);
    response.json(body);
    next();
});

// PUT - Put acts as a full replacement or an creation if something with the 
// identifier does not exist.  For PUT to work correctly, it must contain an
// identifying value.
userRouter.put('', (request, response, next) => {
    const body = request.body;
    
    // ID value is invalid
    if (!body.id || body.id < 1) {
        response.sendStatus(422);
        next();
        return;
    }

    let existingIndex: number | undefined = undefined;
    
    for(const i in users) {
        if(users[i].id === body.id) {
            existingIndex = parseInt(i);
            break;
        }
    }

    if (existingIndex) {
        users[existingIndex] = body;
    } else {
        users.push(body);
        response.status(201);
    }

    response.json(body);
});

/*
    Delete request - Delete is intended to remove a resource from the server
    The resource to delete will be indicated by the ID parameter value
    We must find the user with that id and remove them from the array 
    Send back deleted data with a 200 status
*/
userRouter.delete('/:id', (request, response, next) => {
    const id = parseInt(request.params.id);
    const usersIndex = users.findIndex((user) => user.id === id);
    
    if (usersIndex === -1) {
        response.sendStatus(404);
        next();
        return;
    }

    const user = users.splice(usersIndex, 1)[0];
    response.json(user);
});
export default userMiddleware;