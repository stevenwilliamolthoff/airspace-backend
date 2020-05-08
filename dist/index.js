"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const bodyParser = __importStar(require("body-parser"));
const core_1 = require("@overnightjs/core");
const typeorm_1 = require("typeorm");
const operations_1 = __importDefault(require("./routes/operations"));
class AirspaceServer extends core_1.Server {
    constructor() {
        super(process.env.NODE_ENV === "development"); // setting showLogs to true
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.setupControllers();
    }
    setupControllers() {
        const operationsController = new operations_1.default();
        super.addControllers([operationsController]);
        console.log("Setup controllers.");
    }
    setupDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield typeorm_1.createConnection();
            // await connection.runMigrations()
            console.log("Setup database connections.");
        });
    }
    start(port) {
        this.app.listen(port, () => {
            console.log("Server listening on port: " + port);
        });
    }
}
exports.AirspaceServer = AirspaceServer;
try {
    const server = new AirspaceServer();
    server.setupDatabase().then(() => {
        const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
        server.start(port);
    });
}
catch (error) {
    console.error(error);
    console.error("Failed to start server.");
}
