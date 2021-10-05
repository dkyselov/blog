import * as express from 'express'
import * as bodyParser from 'body-parser'
import { logger } from './logger'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
  }

  /**
   * Config
   * @private
   */
  private config(): void {
    logger.debug('test')
    /* Allow Cross Domain */
    this.app.use(this.allowCrossDomain)
    /* bodyParser */
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: false}))
    /* Error Handler */
    this.app.use(this.errorHandler)
  }

  /**
   * Error Handler
   * @param err
   * @param res
   * @private
   */
  private errorHandler(err, _, res: express.Response): void {
    const message = this.errorResponse(err.status)
    const status = err.status ? err.status : 500
    res.status(status)
      .send({status: false, response: message})
  }

  /**
   * Error response
   * @param status
   */
  private errorResponse = (status: number): string => {
    let response
    switch (status) {
      case 404:
        response = '404 Page Not Found'
        break
      case 403:
        response = '403 No Permission to Access'
        break
      case 401:
        response = '401 Unauthorized'
        break
      case 413:
        response = '413 Request Entity Too Large'
        break
      default:
        response = 'Ooooops, something wrong'
    }
    return response
  }

  /**
   * Allow cross domain
   * @param res
   * @param next
   * @private
   */
  private allowCrossDomain(_, res: express.Response, next: express.NextFunction): void {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  }
}

export default new App().app
