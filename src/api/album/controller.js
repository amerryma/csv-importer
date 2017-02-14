import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Album } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Album.create(body)
    .then((album) => album.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Album.find(query, select, cursor)
    .then((albums) => albums.map((album) => album.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Album.findById(params.id)
    .then(notFound(res))
    .then((album) => album ? album.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Album.findById(params.id)
    .then(notFound(res))
    .then((album) => album ? _.merge(album, body).save() : null)
    .then((album) => album ? album.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Album.findById(params.id)
    .then(notFound(res))
    .then((album) => album ? album.remove() : null)
    .then(success(res, 204))
    .catch(next)
