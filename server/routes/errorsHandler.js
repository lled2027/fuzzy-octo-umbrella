import debugFactory from 'debug'

const debug = debugFactory('app:server')


/**
 * Express error-handling middleware
 */

export const expressErrorHandler = (err, req, res, next) => {
    debug('express request error: %s', err.message)

    const statusCode = err.status || 500
    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || 'Internal Server Error',
            status: statusCode
        }
    })
}

/**
 * Server startup/listen error handler
 */

export const handlerServerError = (error, port) => {
    if (error.code === 'EADDRINUSE') {
        debug(`Port ${port} is already in use. Please choose another port.`)
    } else {
        debug('Unhandled server error: %0', error)
        console.error(`Server error: ${error}`)
    }
    process.exit(1)
}