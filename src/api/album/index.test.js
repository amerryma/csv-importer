import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Album } from '.'

const app = () => express(routes)

let album

beforeEach(async () => {
  album = await Album.create({})
})

test('POST /albums 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ name: 'test', year: 'test', artist: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.artist).toEqual('test')
})

test('GET /albums 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /albums/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${album.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(album.id)
})

test('GET /albums/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /albums/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${album.id}`)
    .send({ name: 'test', year: 'test', artist: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(album.id)
  expect(body.name).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.artist).toEqual('test')
})

test('PUT /albums/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ name: 'test', year: 'test', artist: 'test' })
  expect(status).toBe(404)
})

test('DELETE /albums/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${album.id}`)
  expect(status).toBe(204)
})

test('DELETE /albums/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
