import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { createFromFile, create, index, show, update, destroy } from './controller'
import { schema } from './model'
const multer = require('multer');

export Album, { schema } from './model'

const router = new Router()
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const { name, year, artist } = schema.tree

/**
 * @api {post} /albums Create album
 * @apiName CreateAlbum
 * @apiGroup Album
 * @apiParam name Album's name.
 * @apiParam year Album's year.
 * @apiParam artist Album's artist.
 * @apiSuccess {Object} album Album's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Album not found.
 */
router.post('/',
  upload.single('file'),
  createFromFile)

/**
 * @api {get} /albums Retrieve albums
 * @apiName RetrieveAlbums
 * @apiGroup Album
 * @apiUse listParams
 * @apiSuccess {Object[]} albums List of albums.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /albums/:id Retrieve album
 * @apiName RetrieveAlbum
 * @apiGroup Album
 * @apiSuccess {Object} album Album's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Album not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /albums/:id Update album
 * @apiName UpdateAlbum
 * @apiGroup Album
 * @apiParam name Album's name.
 * @apiParam year Album's year.
 * @apiParam artist Album's artist.
 * @apiSuccess {Object} album Album's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Album not found.
 */
router.put('/:id',
  body({ name, year, artist }),
  update)

/**
 * @api {delete} /albums/:id Delete album
 * @apiName DeleteAlbum
 * @apiGroup Album
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Album not found.
 */
router.delete('/:id',
  destroy)

export default router
