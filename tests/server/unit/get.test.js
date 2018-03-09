// const request = require('supertest');
// const app = require('../../../server/index');

// jest.mock('../../../database/model.js');
// // jest.setTimeout(1000000); // for debugging

// describe('Test the root path', () => {

//     test('It should reply to the GET method', async () => {
//         const response = await request(app).get('/');
//         expect(response.statusCode).toBe(200);
//     });

//     test('It should reply to GET / with index.html', async () => {
//         const response = await request(app).get('/');
//         expect(response.res.headers['content-type']).toMatch(/html/)
//         expect(response.res.text).toMatch(/<body>/);
//     });

//     test('It should reply to GET /rooms with 404 error', async () => {
//       const response = await request(app).get('/rooms');
//       expect(response.statusCode).toBe(404);
//     });

//     test('It should reply to GET /rooms/roomId/description with JSON', async () => {
//       const response = await request(app).get('/api/rooms/1/description');
//       expect(response.statusCode).toBe(200);
//       expect(response.res.headers['content-type']).toMatch(/json/);
//     });
// });