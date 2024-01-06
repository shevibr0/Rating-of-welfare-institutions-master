import mongoose from "mongoose";

//? create schema
const InstitutesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Misgeret_Id: Number,
  Name: String,
  Type_Descr: String,
  Head_Department: String,
  Second_Classific: String,
  Owner_Code_Descr: String,
  Organization: String,
  ORGANIZATIONS_BUSINES_NUM: Number,
  Registered_Business_Id: Number,
  Authoritys: String,
  Authority_Id: Number,
  Region_Descr: String,
  Actual_Capacity: Number,
  Gender_Descr: String,
  Status_des: String,
  STARTD: String,
  Maneger_Name: String,
  Religion: String,
  Educate: String,
  City_Name: String,
  Adrees: String,
  Telephone: Number,
  Fax: String,
  Mailing_Box_Id: String,
  GisX: String,
  GisY: String,
  Target_Population_Descr: String,
  Rating: [{ userId: String, count: Number }],
  avgRating: {
    count: { type: Number, default: 0, min: 0 },
    sum: { type: Number, default: 0, min: 0 },
  },
});

//? create model (collection, schema)

const Institutes = mongoose.model("institutes", InstitutesSchema);
export default Institutes;


