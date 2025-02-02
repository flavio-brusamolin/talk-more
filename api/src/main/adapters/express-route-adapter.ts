import { RequestHandler } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const httpRequest: HttpRequest<any> = {
      body: req.body,
      userId: req.userId
    }

    const { statusCode, body } = await controller.handle(httpRequest)

    if (statusCode === 200) {
      res.status(statusCode).json(body)
    } else {
      res.status(statusCode).json({
        error: body.message
      })
    }
  }
}
