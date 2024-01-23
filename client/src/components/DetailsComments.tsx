import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import StarRating from "./StarRating";
interface Review {
    _id: string;
    userId: any;
    InstitutesId: string;
    Collaboration: { comment: string; rating: number };
    Maintenance: { comment: string; rating: number };
    ReligiousLevel: { comment: string; rating: number, enum: string };
    AdjacentPsychiatrist: { comment: string; response: boolean };
    HostFamilyOption: { comment: string; response: boolean };
    StayOnSaturdaysAndHolidays: { comment: string; response: boolean };
    averageRating: number;
    isBoardingSchool: { comment: string; response: boolean };
    emotionalResponse: { comment: string; response: boolean; rating: number };
    afternoonClasses: { comment: string; response: boolean; rating: number };
}
const DetailsComments: React.FC = () => {

    const [data, setData] = useState([]);
    const params = useParams();
    const reviewId = params["reviewId"]
    useEffect(() => {
        fetchReviewDetails();
    }, []);

    const fetchReviewDetails = async () => {
        console.log("reviewId", reviewId);
        try {
            const { data } = await axios.get(`http://localhost:3000/reviews/getReviewDetails/?reviewId=${reviewId}`);
            console.log("response", data);
            setData(data); // Assuming your API response contains the review details
        } catch (error) {
            console.error("Failed to fetch review details", error);
        }

    };
    return (
        <div className="items-center justify-center container mx-auto mt-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-800 text-center">תגובה מפורטת</h2>
            {data.map((review: Review) => (
                <div key={review._id} className="bg-white rounded p-6 mb-4 shadow-md text-center">
                    <h2 className="text-xl font-semibold mb-2 ">{`${review.userId.name} :נכתב על ידי`}</h2>
                    <p className="flex items-center justify-center mb-2">
                        <span className="ml-1">{`דירוג רמת שיתוף הפעולה: ${review.Collaboration.rating}`}</span>
                        <span className="mr-1">{`שיתוף הפעולה של המוסד עם לשכת הרווחה: ${review.Collaboration.comment}`}</span>
                    </p>
                    <p className="flex items-center justify-center mb-2">
                        <span className="ml-1">{`דירוג רמת התחזוקה והניקיון של המקום: ${review.Maintenance.rating}`}</span>
                        <span className="mr-1">{`רמת התחזוקה והניקיון של המקום: ${review.Maintenance.comment}`}</span>
                    </p>
                    <p>{`רמה דתית של המוסד: ${mapReligiousLevel(review.ReligiousLevel.enum[0])}`}</p>
                    <p>{`רמה דתית של המוסד: ${mapReligiousLevel(review.ReligiousLevel.comment)}`}</p>
                    <p>{`יש פסיכיאטר צמוד במוסד: ${review.AdjacentPsychiatrist.response ? 'כן' : 'לא'}`}</p>
                    <span className="mr-1">{`יש פסיכיאטר צמוד במוסד: ${review.AdjacentPsychiatrist.comment}`}</span>
                    <p>{`יש אופציה למשפחה מארחת: ${review.HostFamilyOption.response ? 'כן' : 'לא'}`}</p>
                    <span className="mr-1">{`יש אופציה למשפחה מארחת: ${review.HostFamilyOption.comment}`}</span>
                    <p>{`יש אפשרות לשהות במסגרת בשבתות וחגים: ${review.StayOnSaturdaysAndHolidays.response ? 'כן' : 'לא'}`}</p>
                    <span className="mr-1">{`יש אפשרות לשהות במסגרת בשבתות וחגים: ${review.StayOnSaturdaysAndHolidays.comment}`}</span>
                    <p>{`האם יש מוסד לימודים בתוך הפנימייה: ${review.isBoardingSchool ? 'כן' : 'לא'}`}</p>
                    <span className="mr-1">{`האם יש מוסד לימודים בתוך הפנימייה: ${review.isBoardingSchool.comment}`}</span>
                    <p className="flex items-center justify-center mb-2">
                        <span className="ml-1">{`דרוג רמת המענה הרגשי שקיימת: ${review.emotionalResponse.rating}`}</span>
                        <span className="mr-1">{`מהי רמת המענה הרגשי שקיימת: ${review.emotionalResponse.comment}`}</span>
                    </p>
                    <p className="flex items-center justify-center mb-2">
                        <span className="ml-1">{`דרוג פעילות אחר הצהרים: ${review.afternoonClasses.rating}`}</span>
                        <span className="mr-1">{`מהי רמת המענים הקיימות של פעילויות וחוגים אחרי צהרים: ${review.afternoonClasses.comment}`}</span>

                    </p>
                    <h6 className="text-3xl font-bold">{`דרוג המוסד `}<br /><StarRating averageRating={review.averageRating} /></h6>
                </div>
            ))}
        </div>
    );
};

const mapReligiousLevel = (level: string): string => {
    switch (level) {
        case 'חילוני':
            return 'חילוני';
        case 'דתי':
            return 'דתי';
        case 'חרדי':
            return 'חרדי';
        default:
            return level; // If the level is not one of the expected values, return as is
    }
};

export default DetailsComments;
