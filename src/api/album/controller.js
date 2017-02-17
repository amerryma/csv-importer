import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Album } from '.'
import csv from 'csvtojson'
import {TextDecoder} from "text-encoding/lib/encoding";

export const createFromFile = function ({files: {file}}, res, next) {
  let items = []

  if (file.mimetype === 'text/csv') {
    let string = new TextDecoder("utf-8").decode(file.data)

    csv()
      .fromString(string)
      .on('json', (jsonObj, rowIndex)=>{
        if (rowIndex > 0) {
          items.push(jsonObj);
        }
      })
      .on('error',(err)=>{
        console.log(err)
      })
      .on('done', ()=>{
        Album.create(items)
        .then(items =>{
          let list = []
          items.forEach(album => list.push(album.view(true)));
          return list
        })
        .then(success(res, 201))
        .catch(next)
      })
  }
}

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
