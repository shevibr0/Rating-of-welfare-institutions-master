import express from "express";
import { secret } from "./config/secret.js";
import "./db/dbConfiguration.js";
import mainRouter from "./routes/configure.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import updateInstitutesOneTimePerWeek from "./utils/updateInstitute.js";
import fileUpload from "express-fileupload"


const app = express();
app.use(cookieParser());

// Allow requests from http://localhost:5173
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 1024 * 1024 * 5 }
}))
const port = secret.PORT;

app.use(express.json());

app.use(mainRouter);

app.listen(port, () => {
    console.log(`server is running on port:${port} \n url: http://localhost:${port}/`)
    updateInstitutesOneTimePerWeek()
});
