import express from "express"
import { secret } from "./config/secret.js";
import "./db/dbConfiguration.js";
import mainRouter from "./routes/configure.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
// import "./utils/insertToDbSync.js"
const app = express();
app.use(cookieParser());
//? give you the ability to use cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const port = secret.PORT;


//? give you the ability to use json in the body of the request
app.use(express.json())

app.use(mainRouter)




//? listening to the port for running the sefrverh
app.listen(port, () => {
    console.log(`server is runnig on port:${port} \n url: http://localhost:${port}/`)
})

// 
// 







