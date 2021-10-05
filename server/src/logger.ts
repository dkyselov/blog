import * as winston from 'winston'
import * as moment from 'moment'

export const logger = new winston.Logger({
    exitOnError: false,
    rewriters: [
        (level, msg, meta) => {
        console.debug('Logger config', {level, msg, meta})
            const name = process.env.APP_NAME
            let localMeta = JSON.parse(JSON.stringify(meta))
            if (localMeta) {
                if (Array.isArray(localMeta)) {
                    localMeta = {lastParamArray: localMeta}
                }
            } else {
                localMeta = {}
            }
            localMeta._app = name
            return localMeta
        }
    ],
    timestamp: () => {
       return moment()
          .format('YYYY-MM-DD HH:mm:ss')
    },
    transports: [
        new winston.transports.Console({
            level: process.env.LOGGER_CONFIG_LEVEL || 'debug',
            handleExceptions: true,
            json: false,
        }),
        //new winston.transports.File({
        //    level: 'error',
        //    name: 'file.error',
        //    filename: `${process.env.LOGGER_CONFIG_PATH}${process.env.LOGGER_CONFIG_FILE}_err.log`,
        //    handleExceptions: true,
        //    maxsize: 15242880,
        //    maxFiles: 3,
        //    colorize: false,
        //}),
        //new winston.transports.File({
        //    level: process.env.LOGGER_CONFIG_LEVEL || 'debug',
        //    name: 'file.all',
        //    filename: `${process.env.LOGGER_CONFIG_PATH}${process.env.LOGGER_CONFIG_FILE}_combined.log`,
        //    handleExceptions: true,
        //    maxsize: 5242880, // 5MB
        //    maxFiles: 5,
        //    colorize: false,
        //}),
    ]
})
