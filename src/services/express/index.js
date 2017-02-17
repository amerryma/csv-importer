import express from 'express'
import fileUpload from 'express-fileupload'
// import forceSSL from 'express-force-ssl'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'

export default (routes) => {
  const app = express()

  /* istanbul ignore next */
  // if (env === 'production') {
  //   app.set('forceSSLOptions', {
  //     enable301Redirects: false,
  //     trustXFPHeader: true
  //   })
  //   app.use(forceSSL)
  // }

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.json({ type: 'application/*+json' }))
  app.use(bodyParser.text({ type: 'text/csv' }))

  app.use(fileUpload())
  app.use(routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
