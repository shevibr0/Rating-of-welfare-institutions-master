import axios from "axios";
import Institutes from "../models/Institute.js";
import fs from "fs"
import { Category } from "../models/categoryModel.js";



(async () => {
    const { data } = await axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=de069ddf-bcbc-4754-bda0-84873a353f7b&limit=9000")
    const records = data.result.records;
    // Type_Descr
    let categories = [];
    records.forEach(rec => {
        if (!categories.some(obj => obj["categoryName"] == rec["Type_Descr"])) {
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

});


(async () => {

    await Category.insertMany([
        {
            "categoryName": "סמך מקצועי"
        },
        {
            "categoryName": "הוסטל"
        },
        {
            "categoryName": "מעון יום"
        },
        {
            "categoryName": "מועדון/מרכז קהילתי"
        },
        {
            "categoryName": "מועדונית שיקומית"
        },
        {
            "categoryName": "סביבה תומכת"
        },
        {
            "categoryName": "פנימיה"
        },
        {
            "categoryName": "טיפול יום"
        },
        {
            "categoryName": "מרכז למניעת אלימות"
        },
        {
            "categoryName": "מרכז טיפולי"
        },
        {
            "categoryName": "מועדונית"
        },
        {
            "categoryName": "נופשון"
        },
        {
            "categoryName": "שילוב בתעסוקה"
        },
        {
            "categoryName": "מעטפת"
        },
        {
            "categoryName": "מרכז הורים ילדים"
        },
        {
            "categoryName": "בית חם"
        },
        {
            "categoryName": "תחנה לטיפול המשפחה"
        },
        {
            "categoryName": "תעסוקה מוגנת )מעש("
        },
        {
            "categoryName": "מערך דיור/דירת לוין"
        },
        {
            "categoryName": "שילוב במעון יום"
        },
        {
            "categoryName": "תוכנית ראשית"
        },
        {
            "categoryName": "קייטנה"
        },
        {
            "categoryName": "מפתן"
        },
        {
            "categoryName": "מעון רב תכליתי"
        },
        {
            "categoryName": "מרכז קשר"
        },
        {
            "categoryName": "הקן"
        },
        {
            "categoryName": "מרכז רב שרותים"
        },
        {
            "categoryName": "תוכנית רגישת תרבות"
        },
        {
            "categoryName": "תוכנית משפחות"
        },
        {
            "categoryName": "ארוחות חמות"
        },
        {
            "categoryName": "מעטפת רכה"
        },
        {
            "categoryName": "דיור מוגן"
        },
        {
            "categoryName": "מוקד תעסוקה"
        },
        {
            "categoryName": "הדרכה שיקומית"
        },
        {
            "categoryName": "קהילה טיפולית"
        },
        {
            "categoryName": "תעסוקה ניתמכת"
        },
        {
            "categoryName": "מרכז שיקום"
        },
        {
            "categoryName": "סדנאות מעבר"
        },
        {
            "categoryName": "קורת גג"
        },
        {
            "categoryName": "תוכנית מעבר"
        },
        {
            "categoryName": "אוריון"
        },
        {
            "categoryName": "טיפול תרופתי"
        },
        {
            "categoryName": "מעונית"
        }
    ])


})()