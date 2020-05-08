require("dotenv").config()
import * as bodyParser from "body-parser"
import { Server } from "@overnightjs/core"
import { createConnection, Connection } from "typeorm"
import OperationsController from "./routes/operations"

export class AirspaceServer extends Server {
  constructor() {
    super(process.env.NODE_ENV === "development") // setting showLogs to true
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.setupControllers()
  }

  private setupControllers(): void {
    const operationsController = new OperationsController()
    super.addControllers([operationsController])
    console.log("Setup controllers.")
  }

  public async setupDatabase(): Promise<void> {
    const connection: Connection = await createConnection()
    await connection.runMigrations()
    console.log("Setup database connections.")
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log("Server listening on port: " + port)
    })
  }
}

try {
  const server = new AirspaceServer()
  server.setupDatabase().then(() => {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 8080
    server.start(port)
  })
} catch (error) {
  console.error(error)
  console.error("Failed to start server.")
}
