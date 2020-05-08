import { OK, BAD_REQUEST } from "http-status-codes"
import { Controller, Get, Middleware, Put } from "@overnightjs/core"
import { Request, Response } from "express"
import Operations from "../entities/Operations"

@Controller("operations")
export default class OperationsController {
  @Get("/")
  private async getOperations(request: Request, response: Response) {
    try {
      const operations: Operations[] = await Operations.find()
      return response.json({ operations })
    } catch (error) {
      console.error(error)
      return response.status(BAD_REQUEST).json({ message: "error" })
    }
  }
  @Put("/")
  private async putOperation(request: Request, response: Response) {
    try {
      const operation = new Operations(request.body)
      await operation.save()
      return response.json({ operation })
    } catch (error) {
      console.error(error)
      return response.status(BAD_REQUEST).json({ message: "error" })
    }
  }
}
