import express from 'express';

export const petRouter = express.Router();

interface Pet {
    id: number;
    name: string;
    species: string;
    birthdate: Date;
    ownerId: number;
}

const pets: Pet[] = [{
    id: 1,
    name: 'Fluffy',
    species: 'cat',
    birthdate: new Date('2019-01-01'),
    ownerId: 1
}];

petRouter.get('', (request, response, next) => {
    response.json(pets);
    next();
});