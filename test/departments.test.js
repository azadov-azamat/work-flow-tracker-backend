const request = require('supertest');
const app = require('../app'); // Sizning app.js faylingizning manzili

describe('Department API', () => {
    let createdDepartmentId;

    // Department yaratish testi
    it('should create a new department', async () => {
        const res = await request(app)
            .post('/api/departments')
            .send({
                name: 'IT Department',
                region: 'Tashkent'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('id');
        createdDepartmentId = res.body.data.id;
    });

    // Barcha departmentlarni olish testi
    it('should get all departments', async () => {
        const res = await request(app).get('/api/departments');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeInstanceOf(Array);
    });

    // Departmentni ID bo'yicha olish testi
    it('should get a department by ID', async () => {
        const res = await request(app).get(`/api/departments/${createdDepartmentId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('id', createdDepartmentId);
    });

    // Departmentni yangilash testi
    it('should update a department by ID', async () => {
        const res = await request(app)
            .patch(`/api/departments/${createdDepartmentId}`)
            .send({
                region: 'Samarkand',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes).toHaveProperty('region', 'Samarkand');
    });

    // Departmentni o'chirish testi
    it('should delete a department by ID', async () => {
        const res = await request(app).delete(`/api/departments/${createdDepartmentId}`);
        expect(res.statusCode).toEqual(204);
    });

    // Department o'chirilganini tekshirish testi
    it('should return 404 for deleted department', async () => {
        const res = await request(app).get(`/api/departments/${createdDepartmentId}`);
        expect(res.statusCode).toEqual(404);
    });
});
