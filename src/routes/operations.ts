import { OK, BAD_REQUEST } from "http-status-codes"
import { Controller, Get, Middleware, Put, Post } from "@overnightjs/core"
import { Request, Response } from "express"
import Operations from "../entities/Operations"
import moment from "moment"

@Controller("operations")
export default class OperationsController {
  @Get("/")
  private async getOperations(request: Request, response: Response) {
    try {
      let operations: Operations[] = await Operations.find()
      operations = Operations.getSorted(operations)
      return response.json({ operations })
    } catch (error) {
      console.error(error)
      return response.status(BAD_REQUEST).json({ message: "error" })
    }
  }
  @Get(":id")
  private async getOperation(request: Request, response: Response) {
    try {
      let operation: Operations = await Operations.findOne(request.params.id)
      return response.json({ operation })
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
  @Post(":id")
  private async udpateOperation(request: Request, response: Response) {
    try {
      let operation: Operations = await Operations.findOne(request.params.id)
      if (operation) {
        operation = await operation.update(request.body)
      }
      return response.json({ operation })
    } catch (error) {
      console.error(error)
      return response.status(BAD_REQUEST).json({ message: "error" })
    }
  }
}
