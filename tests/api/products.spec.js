const { default: mongoose } = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const app = require('../../app');

const Product = require('../../models/product.model');

describe('Api de products', () => {

    describe('Get de /api/products', () => {

        beforeAll('Api de productos', async () => {
            await mongoose.connect('mongodb://127.0.0.1:27017/tienda_online')
        })

        let response;
        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
        });


        it('debería devolver estatus 200', async () => {

            expect(response.statusCode).toBe(200);
        });

        it('debería devolver la respuesta en formato json', async () => {

            expect(response.headers['content-type']).toContain('application/json')
        });

        it('debería devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });

    });



});

describe('PUT /api/products/PRODUCTID', () => {

    const newProduct = { name: 'producto prueba' }
    let prodcuctToEdit;
    let response;

    beforeAll(async () => {
        prodcuctToEdit = await Product.create(newProduct);
        response = await request(app).put(`/api/products/${prodcuctToEdit._id}`).send({ name: 'coche' });

    });

    afterAll(async () => {
        await Product.findByIdAndDelete(prodcuctToEdit._id);
    });

    it('deberia existtir la url ', () => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
    });

    it('los datos deberian actuañlizzarse', () => {
        expect(response.body.name).toBe('coche');
        expect(response.body.name).toBe('moto');
    });

});