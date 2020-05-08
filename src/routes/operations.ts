import { OK, BAD_REQUEST } from "http-status-codes"
import { Controller, Get, Middleware } from "@overnightjs/core"
import { Request, Response } from "express"

@Controller("operations")
export default class OperationsController {
  @Get("/")
  private async getOperations(request: Request, response: Response) {
    try {
      return response.json({ message: "ok" })
    } catch (error) {
      console.error(error)
      return response.status(BAD_REQUEST).json({ message: "error" })
    }
  }
}
