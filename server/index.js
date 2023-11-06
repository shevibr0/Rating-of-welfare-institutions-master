import express from "express"
import { secret } from "./config/secret.js";
import "./db/dbConfiguration.js";
import mainRouter from "./routes/configure.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import axios from "axios";
import Institutes from "./models/Institute.js";
import fs from "fs"
const app = express();
app.use(cookieParser());
//? give you the ability to use cors
app.use(cors({
    origin: "*",
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

const getAllData = async () => {
    const { data } = await axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=de069ddf-bcbc-4754-bda0-84873a353f7b&limit=9000")
    const records = data.result.records;
    // Type_Descr
    let categories = [];
    records.forEach(rec => {
        if (!categories.some(obj => obj["Type_Descr"] == rec["Type_Descr"])) {
            categories.push({ categoryName: rec.Type_Descr })
        }

    })

    fs.writeFile("categories.json", JSON.stringify(categories), (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("done")
        }
    })

}
// 
// getAllData()
// 


//     await Institutes.deleteMany({});
//   const res =await Institutes.insertMany(records)




