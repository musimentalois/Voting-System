import express,{json} from "express"
import { config } from "dotenv";
config({ path: "./.env" });
import "./utils/database.js"
import cors from "cors";
import { corsFunction } from "./utils/cors.js";
import userRoutes from "./routes/user.routes.js"
import candidateRoutes from "./routes/candidate.routes.js"
import { createRequire } from "module";
import swaggerUi from 'swagger-ui-express';
 
const require = createRequire(import.meta.url);
const swaggerJson = require("../swagger.json");
const app = express();

app.use(cors());
app.use(corsFunction);
app.use(json())

// Logging
app.use((req,res,next)=>{
    console.log(`request : ${req.method} ${req.url}`);
    next();
})

// API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

// Routes
app.use("/users",userRoutes)
app.use("/candidates",candidateRoutes)

// Server
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
})