import type { RequestHandler } from 'express'

function asyncHandler(requestHandler: RequestHandler): RequestHandler {
  return function (req, res, next) {
    Promise.resolve(requestHandler(req, res, next)).catch(next)
  }
}

export { asyncHandler }
