import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router';
import axios from 'axios';

interface RatingFormData {
  [key: string]: {
    rating?: number;
    comment: string;
    response?: boolean;
    religiousLevel?: string;
  };
}

const Rating: React.FC = () => {

  const initialFormData: RatingFormData = {
    Collaboration: { rating: 0, comment: '' },
    Maintenance: { rating: 0, comment: '' },
    ReligiousLevel: { rating: 0, comment: '', religiousLevel: '' },
    AdjacentPsychiatrist: { comment: '', response: false },
    HostFamilyOption: { comment: '', response: false },
    StayOnSaturdaysAndHolidays: { comment: '', response: false },
    isBoardingSchool: { comment: '', response: false },
    emotionalResponse: { rating: 0, comment: '', response: false },
    afternoonClasses: { rating: 0, comment: '', response: false }
  };

  const questions = [
    { key: 'Collaboration', text: 'מהי רמת שיתוף הפעולה של המוסד עם לשכת הרווחה', hasRating: true },
    { key: 'Maintenance', text: 'מהי רמת התחזוקה והניקיון של המקום', hasRating: true },
    { key: 'ReligiousLevel', text: 'מהי הרמה הדתית של המוסד' },
    { key: 'AdjacentPsychiatrist', text: 'האם יש פסיכיאטר צמוד במוסד' },
    { key: 'HostFamilyOption', text: 'האם יש אפשרות למשפחה מארחת' },
    { key: 'StayOnSaturdaysAndHolidays', text: 'האם יש אפשרות לשהות במסגרת בשבתות וחגים' },
    { key: 'isBoardingSchool', text: 'האם יש מוסד לימודים בתוך הפנימייה' },
    { key: 'emotionalResponse', text: 'האם יש מענה רגשי במוסד', hasRating: true },
    { key: 'afternoonClasses', text: 'האם קיימות פעילויות וחוגים אחרי צהרים', hasRating: true },
  ];

  const [formData, setFormData] = useState<RatingFormData>(initialFormData);
  const [count, setCount] = useState(0);
  const [accessToken, setAccessToken] = useState<string | undefined>("");

  useEffect(() => {
    setAccessToken(Cookies.get('access_token'));
    console.log("accessToken", accessToken)
  }, []);
  const params = useParams();
  const id = params["id"]
  const handleBooleanChange = (questionKey: string, value: boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [questionKey]: {
        ...prevFormData[questionKey],
        response: value,
      },
    }));
  };

  const handleCommentChange = (questionKey: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [questionKey]: {
        ...prevFormData[questionKey],
        comment: value,
      },
    }));
  };

  const questionHasRating = (questionKey: string): boolean => {
    return (
      questionKey !== 'HostFamilyOption' &&
      questionKey !== 'StayOnSaturdaysAndHolidays' &&
      questionKey !== 'AdjacentPsychiatrist' &&
      questionKey !== 'isBoardingSchool' &&
      !questions.find((q) => q.key === questionKey)?.hasRating
    );
  };

  const handleReligiousLevelChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ReligiousLevel: {
        ...prevFormData.ReligiousLevel,
        religiousLevel: value,
      },
    }));
  };

  const handleRatingChange = (questionKey: string, value: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [questionKey]: {
        ...prevFormData[questionKey],
        rating: value,
      },
    }));
  };

  const sendReview = async () => {
    try {
      console.log('accessToken:', accessToken);
      const instituteId = id;
      // Make a POST request to your server to add the new rating
      const response = await fetch(`http://localhost:3000/institutes/addRating?institutId=${instituteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          count,
        }),
      });

      console.log('Payload:', JSON.stringify({ count }));
      console.log('Response status:', response.status);
      console.log('Response data:', await response.json());

      if (response.ok) {
        console.log('Rating submitted successfully!');
        // Additional logic after successful submission
      } else {
        console.log('Failed to submit rating.');
        // Handle failure scenario
      }
    } catch (error) {
      console.error('Error during rating submission:', error);
      // Handle error scenario
    }


    try {
      console.log("accessToken", accessToken);
      const instituteId = id;
      const response = await fetch(`http://localhost:3000/reviews/addReview/?institutId=${instituteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          Collaboration: {
            comment: formData.Collaboration.comment || '',
            rating: formData.Collaboration.rating || null,
            response: formData.Collaboration.response || false,
          },
          Maintenance: {
            comment: formData.Maintenance.comment || '',
            rating: formData.Maintenance.rating || null,
            response: formData.Maintenance.response || false,
          },
          ReligiousLevel: {
            comment: formData.ReligiousLevel.comment || '',
            rating: formData.ReligiousLevel.rating || null,
            enum: formData.ReligiousLevel.religiousLevel ? [formData.ReligiousLevel.religiousLevel] : null,
          },
          AdjacentPsychiatrist: {
            comment: formData.AdjacentPsychiatrist.comment || '',
            response: formData.AdjacentPsychiatrist.response || false,
          },
          HostFamilyOption: {
            comment: formData.HostFamilyOption.comment || '',
            response: formData.HostFamilyOption.response || false,
          },
          StayOnSaturdaysAndHolidays: {
            comment: formData.StayOnSaturdaysAndHolidays.comment || '',
            response: formData.StayOnSaturdaysAndHolidays.response || false,
          },
          isBoardingSchool: {
            comment: formData.isBoardingSchool.comment || '',
            response: formData.isBoardingSchool.response || false,
          },
          emotionalResponse: {
            comment: formData.emotionalResponse.comment || '',
            rating: formData.emotionalResponse.rating || null,
            response: formData.emotionalResponse.response || false,
          },
          afternoonClasses: {
            comment: formData.afternoonClasses.comment || '',
            rating: formData.afternoonClasses.rating || null,
            response: formData.afternoonClasses.response || false,
          },
        }),
      });

      console.log("formd", formData);
      console.log('Response status:', response.status);
      console.log('Response data:', await response.json());

      if (response.ok) {
        console.log('Rating submitted successfully!');
        // Additional logic after successful submission
      } else {
        console.log('Failed to submit rating.');
        // Handle failure scenario
      }
    } catch (error) {
      console.error('Error during rating submission:', error);
      // Handle error scenario
    }
    //   if (response1.status === 200) {
    //     // Optionally, you can update the local state or navigate to another page
    //     // For example, navigate back to the InstituteInfo page
    //     // history.push(`/info/${instituteId}`);
    //   } else {
    //     console.error('Failed to add rating');
    //   }
    // } catch (error) {
    //   console.error('Error submitting rating:', error);
    // }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Calculate the total average rating
    const totalRatings = Object.values(formData)
      .filter((item) => item.rating !== undefined)
      .map((item) => item.rating ?? 0);

    const newTotalAverageRating = totalRatings.length > 0 ? totalRatings.reduce((acc, rating) => acc + rating, 0) / totalRatings.length : 0;
    console.log("totalAverageRating", newTotalAverageRating);
    // Add the total average rating to the formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      averageRating: newTotalAverageRating,
    }));
    console.log("totalAverageRating2", newTotalAverageRating);
    // Update the state with the latest totalAverageRating
    setCount(newTotalAverageRating);
    console.log("soffi", count)
    await sendReview();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100 text-right">
      <div className="w-full max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md text-right">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-800 text-center">דרגו את החוויה שלכם</h2>
        <form onSubmit={handleSubmit} className="w-full">
          {questions.map(({ key, text, hasRating }) => (
            <div key={key} className="mb-4">
              <p className="text-lg font-semibold mb-2 text-right">{text}</p>
              {key === 'ReligiousLevel' ? (
                <div className="flex space-x-4 text-right">
                  {['ultra-Orthodox', 'secular', 'religious'].map((option) => (
                    <label key={option} className="flex items-center text-right">
                      <input
                        type="radio"
                        name="ReligiousLevel"
                        value={option}
                        onChange={() => handleReligiousLevelChange(option)}
                        className="mr-1 text-right"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex space-x-4 text-right">
                  {hasRating ? (
                    [1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="flex items-center text-right">
                        <input
                          type="radio"
                          name={key}
                          value={star}
                          onChange={() => handleRatingChange(key, star)}
                          className="mr-1 text-right"
                        />
                        {star}
                      </label>
                    ))
                  ) : (
                    <div className="flex space-x-4 text-right">
                      <label className="flex items-center text-right">
                        <input
                          type="radio"
                          name={key}
                          value="true"
                          onChange={() => handleBooleanChange(key, true)}
                          className="mr-1 text-right"
                        />
                        כן
                      </label>
                      <label className="flex items-center text-right">
                        <input
                          type="radio"
                          name={key}
                          value="false"
                          onChange={() => handleBooleanChange(key, false)}
                          className="mr-1 text-right"
                        />
                        לא
                      </label>
                    </div>
                  )}
                </div>
              )}
              <div className="mt-2">
                <label className="block text-sm font-semibold">אם תוכל/י להרחיב בכמה מילים:</label>
                <textarea
                  dir="rtl"
                  value={formData[key]?.comment || ''}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handleCommentChange(key, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:border-purple-300">
            שלח
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rating;
