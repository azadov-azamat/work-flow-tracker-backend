const request = require('supertest');
const app = require('../app'); // Sizning app.js faylingizning manzili

describe('User API', () => {
    let createdUserId;

    // User yaratish testi
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'Test User',
                birth_date: '1990-01-01',
                role: 'employee',
                position: 'Developer',
                department_id: 1,
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('id');
        createdUserId = res.body.data.id;
    });

    // Barcha userlarni olish testi
    it('should get all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeInstanceOf(Array);
    });

    // Userni ID bo'yicha olish testi
    it('should get a user by ID', async () => {
        const res = await request(app).get(`/api/users/${createdUserId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('id', createdUserId);
    });

    // Userni yangilash testi
    it('should update a user by ID', async () => {
        const res = await request(app)
            .patch(`/api/users/${createdUserId}`)
            .send({
                position: 'Senior Developer',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes).toHaveProperty('position', 'Senior Developer');
    });

    // Userni o'chirish testi
    it('should delete a user by ID', async () => {
        const res = await request(app).delete(`/api/users/${createdUserId}`);
        expect(res.statusCode).toEqual(204);
    });

    // User o'chirilganini tekshirish testi
    it('should return 404 for deleted user', async () => {
        const res = await request(app).get(`/api/users/${createdUserId}`);
        expect(res.statusCode).toEqual(404);
    });
});
