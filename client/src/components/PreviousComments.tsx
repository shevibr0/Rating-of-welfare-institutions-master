import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';




interface Review {
    _id: string;
    userId: any;
    InstitutesId: string;
    Collaboration: { response: string; rating: number };
    Maintenance: { response: string; rating: number };
    ReligiousLevel: { response: string; rating: number };
    AdjacentPsychiatrist: { response: boolean };
    HostFamilyOption: { response: boolean };
    StayOnSaturdaysAndHolidays: { response: boolean };
    averageRating: number;
    isBoardingSchool: boolean;
    emotionalResponse: { response: boolean; rating: number };
    afternoonClasses: { response: boolean; rating: number };
}


const PreviousComments: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Review[]>([]);

    useEffect(() => {
        fetchReviews();
    }, [id]);

    const fetchReviews = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/reviews/getReviews/?institutId=${id}&offset=4`);
            setData(data); // Assuming your API response has a 'reviews' field
        } catch (error) {
            console.log("failed");
        }
    };

    return (
        <div className="items-center justify-center container mx-auto mt-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-800 text-center">תגובות קודמות על המוסד</h2>
            {data.map((review: Review) => (
                <div key={review._id} className="bg-white rounded p-6 mb-4 shadow-md text-center">
                    <h2 className="text-xl font-semibold mb-2 ">{`${review.userId.name} :נכתב על ידי`}</h2>
                    <p className="flex items-center justify-center mb-2">
                        <span className="ml-1">{`דירוג רמת שיתוף הפעולה: ${review.Collaboration.rating}`}</span>
                        <span className="mx-4">•</span>
                        <span className="mr-1">{`שיתוף הפעולה של המוסד עם לשכת הרווחה: ${review.Collaboration.response}`}</span>
                    </p>
                    <p className="flex items-center justify-center mb-2">
                        <span className="ml-1">{`דירוג רמת התחזוקה והניקיון של המקום: ${review.Maintenance.rating}`}</span>
                        <span className="mx-4">•</span>
                        <span className="mr-1">{`רמת התחזוקה והניקיון של המקום: ${review.Maintenance.response}`}</span>
                    </p>
                    <p>{`רמה דתית של המוסד: ${mapReligiousLevel(review.ReligiousLevel.response)}`}</p>

                    <p>{`יש פסיכיאטר צמוד במוסד: ${review.AdjacentPsychiatrist.response ? 'כן' : 'לא'}`}</p>

                    <p>{`יש אופציה למשפחה מארחת: ${review.HostFamilyOption.response ? 'כן' : 'לא'}`}</p>

                    <p>{`יש אפשרות לשהות במסגרת בשבתות וחגים: ${review.StayOnSaturdaysAndHolidays.response ? 'כן' : 'לא'}`}</p>
                    <p>{`האם יש מוסד לימודים בתוך הפנימייה: ${review.isBoardingSchool ? 'כן' : 'לא'}`}</p>
                    <p className="flex items-center justify-center mb-2">
                        <span className="ml-1">{`מהי רמת המענה הרגשי שקיימת: ${review.emotionalResponse.rating}`}</span>
                        <span className="mx-4">•</span>
                        <span className="mr-1">{`האם יש מענה רגשי במוסד: ${review.emotionalResponse.response ? 'כן' : 'לא'}`}</span>
                    </p>
                    <p className="flex items-center justify-center mb-2">
                        <span className="ml-1">{`רמת הדירוג של הפעילויות והחוגים אחר הצהריים: ${review.afternoonClasses.rating}`}</span>
                        <span className="mx-4">•</span>
                        <span className="mr-1">{`האם קיימות פעילויות וחוגים אחרי צהרים: ${review.afternoonClasses.response ? 'כן' : 'לא'}`}</span>
                    </p>
                    <h6 className="text-3xl font-bold">{`דרוג המוסד `}<br /><StarRating averageRating={review.averageRating} /></h6>
                </div>
            ))}
        </div>
    );
};

const mapReligiousLevel = (level: string): string => {
    switch (level) {
        case 'secular':
            return 'חילוני';
        case 'religious':
            return 'דתי';
        case 'orthodox':
            return 'חרדי';
        default:
            return level; // If the level is not one of the expected values, return as is
    }
};

export default PreviousComments;