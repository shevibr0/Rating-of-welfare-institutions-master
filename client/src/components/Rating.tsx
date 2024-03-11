import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Image } from 'cloudinary-react';
import { useContext } from 'react';
import UserContext from '../context/userContext';
import axios from 'axios';

interface Review {
  _id: string;
}

interface RatingFormData {
  [key: string]: {
    rating?: number | null | undefined;
    comment: string;
    response?: boolean | null | undefined;
    religiousLevel?: string | null | undefined;
    reviewId?: string;
  };
}

const Rating: React.FC = () => {
  const { user: User } = useContext(UserContext);
  const email = User ? User.email : '';
  const idUser = User ? User._id : '';

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]); // Define an array ref for the file input elements

  const [images, setImages] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);


  const initialFormData: RatingFormData = {
    Collaboration: { rating: 0, comment: '' },
    Maintenance: { rating: 0, comment: '' },
    ReligiousLevel: { rating: 0, comment: '', religiousLevel: '' },
    AdjacentPsychiatrist: { comment: '', response: false },
    HostFamilyOption: { comment: '', response: false },
    StayOnSaturdaysAndHolidays: { comment: '', response: false },
    isBoardingSchool: { comment: '', response: false },
    emotionalResponse: { rating: 0, comment: '', response: false },
    afternoonClasses: { rating: 0, comment: '', response: false },
  };

  const questions = [
    { key: 'Collaboration', text: 'מהי רמת שיתוף הפעולה של המוסד עם לשכת הרווחה', hasRating: true },
    { key: 'Maintenance', text: 'מהי רמת התחזוקה והניקיון של המקום', hasRating: true },
    { key: 'ReligiousLevel', text: 'מהי הרמה הדתית של המוסד' },
    { key: 'AdjacentPsychiatrist', text: 'האם יש פסיכיאטר צמוד במוסד' },
    { key: 'HostFamilyOption', text: 'האם יש אפשרות למשפחה מארחת' },
    { key: 'StayOnSaturdaysAndHolidays', text: 'האם יש אפשרות לשהות במסגרת בשבתות וחגים' },
    { key: 'isBoardingSchool', text: 'האם יש מוסד לימודים בתוך הפנימייה' },
    { key: 'emotionalResponse', text: 'מה רמת המענה רגשי במוסד', hasRating: true },
    { key: 'afternoonClasses', text: 'מה רמת הפעילויות וחוגים אחרי צהרים', hasRating: true },
  ];

  const [formData, setFormData] = useState<RatingFormData>(initialFormData);
  const [accessToken, setAccessToken] = useState<string | undefined>("");
  const [review, setReview] = useState<Review | null>(null);
  const params = useParams();
  const id = params["id"];
  const nav = useNavigate();


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      console.log('Selected images:', selectedImages);
      // Check if total images selected are within the limit
      if (images.length + selectedImages.length <= 5) {
        setImages(prevImages => [...prevImages, ...selectedImages]);
        console.log('Selected images:', images);
      } else {
        console.log("You can only upload up to 5 images.");
      }
    }
  };

  const handleBooleanChange = (questionKey: string, value: boolean) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [questionKey]: {
        ...prevFormData[questionKey],
        response: value,
      },
    }));
  };

  const handleCommentChange = (questionKey: string, value: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [questionKey]: {
        ...prevFormData[questionKey],
        comment: value,
      },
    }));
  };

  const handleReligiousLevelChange = (value: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      ReligiousLevel: {
        ...prevFormData.ReligiousLevel,
        religiousLevel: value,
      },
    }));
  };

  const handleRatingChange = (questionKey: string, value: number) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [questionKey]: {
        ...prevFormData[questionKey],
        rating: value,
      },
    }));
  };

  const sendReview = async (newTotalAverageRating: number, reviewId: string) => {
    try {
      const instituteId = id;

      const requestData = {
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
        countData: {
          count: newTotalAverageRating,
          reviewId: "",
        },
      };

      const [responseReview, responseInstitute] = await Promise.all([
        fetch(`http://localhost:3000/reviews/addReview/?institutId=${instituteId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify(requestData),
        }),
        fetch(`http://localhost:3000/institutes/addRating?institutId=${instituteId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify(requestData.countData),
        }),
      ]);
      console.log('responseReview:', responseReview);
      console.log('responseInstitute:', responseInstitute);

      if (responseReview.ok && responseInstitute.ok) {
        console.log('Rating and count submitted successfully!');
        nav(`/info/${id}`);
      } else {
        console.log('Failed to submit rating or count.');
      }
    } catch (error) {
      console.error('Error during rating and count submission:', error);
    }
  };


  const sendEmail = async (review: Review | null) => {
    try {
      if (review === null) {
        console.error('Review ID is null');
        return;
      }

      const response = await fetch('http://localhost:3000/institutes/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          link: `http://localhost:5173/info/${id}/previousComments/detailsComments/${review}`,
          id: id,
          email: email,
          to: 'mepe.leos@gmail.com',
          subject: 'נוספה תגובה חדשה',
          text: JSON.stringify(formData), // Convert form data to JSON string
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  const getReviewIdByInstitutesId = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/reviews/getReviewIdByInstitutesId?instituteId=${id}&userId=${idUser}`);
      console.log("rrrrr", response.data.reviewId);
      return response.data.reviewId;
    } catch (error) {
      console.error('Error fetching review id:', error);
      return null;
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append uploaded image files
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });

      // Append additional data if needed
      formData.append('institutId', id);

      // Send form data along with images to the server
      const uploadResponse = await fetch('http://localhost:3000/reviews/uploadImages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: formData
      });

      if (!uploadResponse.ok) {
        console.log('Failed to upload images');
      }

      // Calculate average rating and update form data
      const totalRatings = Object.values(formData)
        .filter((item) => item.rating !== undefined && item.rating !== null)
        .map((item) => item.rating);

      const newTotalAverageRating =
        totalRatings.length > 0
          ? totalRatings.reduce((acc, rating) => acc + (rating as number), 0) / totalRatings.filter((rating) => rating !== 0).length
          : 0;

      setFormData((prevFormData) => ({
        ...prevFormData,
        averageRating: newTotalAverageRating,
      }));

      // Navigate to a new page
      nav(`/info/${id}/previousComments`);

      // Perform asynchronous tasks
      await Promise.all([
        sendReview(newTotalAverageRating, formData.countData?.reviewId || ''),
        setUploadedImageUrls(uploadedImageUrls),
      ]);


      console.log("imagesf", images);
      console.log('Form submitted successfully!');



      const reviewId = await getReviewIdByInstitutesId();
      // Call sendEmail function after successful submission of review
      await sendEmail(reviewId);
      console.log("review1", reviewId)
      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };
  const handleImageUploadClick = () => {
    // Trigger the click event of the last file input when the button is clicked
    const lastFileInputRef = fileInputRefs.current[fileInputRefs.current.length - 1];
    if (lastFileInputRef) {
      lastFileInputRef.click();
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100 text-right">
      <div className="w-full max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md text-right">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-800 text-center">דרגו את החוויה שלכם</h2>
        <form onSubmit={handleSubmit} className="w-full" encType="multipart/form-data">
          {questions.map(({ key, text, hasRating }) => (
            <div key={key} className="mb-4">
              <p className="text-lg font-semibold mb-2 text-right">{text}</p>
              {key === 'ReligiousLevel' ? (
                <div className="flex space-x-4 text-right">
                  {['חרדי', 'חילוני', 'דתי'].map((option) => (
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
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleCommentChange(key, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
          <div className="mb-4">
            {images.length < 5 && (
              <>
                <label className="block text-lg font-semibold mb-2 text-right">הוספת תמונה</label>
                <input
                  ref={ref => {
                    fileInputRefs.current[fileInputRefs.current.length] = ref;
                  }}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={handleImageUploadClick}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Add File
                </button>
              </>
            )}
            {images.map((image, index) => (
              <div key={index} className="mt-2">
                <Image src={URL.createObjectURL(image)} alt="Uploaded Image" />
              </div>
            ))}

          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:border-purple-300"
          >
            שלח
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rating;
