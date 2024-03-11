import axios from "axios"
import Institutes from "../models/Institute.js"
import cron from "node-cron"
const updateInstitute = async () => {
    try {
        const { data: { result: { records } } } = await axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=de069ddf-bcbc-4754-bda0-84873a353f7b")
        const currentIntitutes = await Institutes.find({}).countDocuments()
        const numberOfNewInstitutes = records.length - currentIntitutes;
        if (numberOfNewInstitutes < 1) return;
        const newInstitutes = records.slice(records.length - numberOfNewInstitutes, records.length)
        for (const institute of newInstitutes) {
            delete institute._id
        }
        const res = await Institutes.insertMany(newInstitutes)
        console.log(res)
    } catch (error) {
        console.log(error)
    }


}

const updateInstitutesOneTimePerWeek = () => {
    cron.schedule('0 0 * * 0', updateInstitute)
}
export default updateInstitutesOneTimePerWeek