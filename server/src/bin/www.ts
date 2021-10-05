import * as dotenv from 'dotenv'

dotenv.config()

import app from '../app'
import { logger } from '../logger'

/**
 * Normalize port
 * @param val
 */
const normalizePort = (val): number | boolean => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

const port = normalizePort(process.env.NODE_PORT || '3000')

/**
 * Start listen server
 */
app.listen(port, () => {
  logger.debug(`Express server listening on port ${port}...`)
})
