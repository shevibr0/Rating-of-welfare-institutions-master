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
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="bg-orange-100">
      <button className="left-0 top-0 lg:hidden md:hidden sm:hidden" onClick={() => { setIsOpen(!isOpen) }} >
        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 11h16M4 16h16" />
        </svg>
      </button >
      {isOpen && (
        <nav className="lg:hidden md:hidden sm:hidden left-0 top-0 flex shadow bg-white  justify-around items-center text-purple-500 lg:text-3xl lg:h-[80px] md:text-2m md:h-[30px] sm:text-sm  text-xs mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer">
          <div onClick={() => nav('/login')}>
            הרשמה
          </div>
          <div onClick={() => nav('/contact')}>
            צור קשר
          </div>
          <div onClick={() => nav('/threeTop')}>
            מוסדות בדירוג הגבוה ביותר
          </div>
          <div onClick={() => nav('/institutesCategory')}>
            מוסדות בארץ
          </div>
          <div className='font-bold'>
            אודות
          </div>
        </nav>
      )}
      <div className="flex  justify-center items-center">
        <img className="mt-2 lg:hidden md:hidden sm:hidden max-w-[25%]" src="/לוגו.svg" alt="Logo" />

      </div>
      <nav className="hidden lg:flex md:flex sm:flex left-0 top-0 shadow bg-white  justify-center  items-center  text-purple-500 lg:text-2xl  lg:h-[47px] md:text-sm  md:h-[40px] sm:text-xs  sm:space-x-12 sm:h-[40px]  mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer space-x-11">
        <img className="max-w-[2%] lg:max-w-[4%] lg:mr-15  md:max-w-[4%] sm:max-w-[3%]" src="/לוגו.svg" alt="Logo" />
        <div onClick={() => nav('/register')}>
          התחברות
        </div>
        <div onClick={() => nav('/login')}>
          הרשמה
        </div>
        <div onClick={() => nav('/contact')}>
          צור קשר
        </div>
        <div onClick={() => nav('/threeTop')}>
          מוסדות בדירוג הגבוה ביותר
        </div>
        <div className='font-bold' onClick={() => nav('/institutesCategory')}>
          מוסדות בארץ
        </div>
        <div onClick={() => nav('/')}>
          אודות
        </div>
      </nav>
      <div className='flex items-center'>
        <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15  md:max-w-[1%] sm:max-w-[1%]" src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
      </div>
      <div className='items-center justify-center flex'>
        <div className="flex w-[220.74px] h-[30.78px] bg-purple-500 justify-center items-center gap-[8.29px]">
          <img className="flex " src="/הורדה.svg" alt="Logo" />
          <button type="button"
            onClick={handleImageUploadClick} className="text-center text-indigo-50 text-xl font-bold font-['Alef'] leading-[24.86px]">עלה תמונות של המוסד</button>
        </div>
      </div>

      <div className="mt-3 lg:mb-16 md:mb-14  flex flex-wrap justify-center">
        {images.length < 5 && (
          <>
            <input
              ref={ref => {
                fileInputRefs.current[fileInputRefs.current.length] = ref;
              }}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />

          </>
        )}
        <div className='lg:flex md:flex'>
          {images.map((image, index) => (
            <div key={index} className="h-44 w-44  items-center ml-9 mr-4 ">
              <img src={URL.createObjectURL(image)} alt="Uploaded Image" className="max-w-full h-auto" />
            </div>
          ))}
        </div>
      </div>


      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center" encType="multipart/form-data">
        {questions.map(({ key, text, hasRating }) => (
          <div key={key} className="w-full  md:w-1/2 lg:w-1/3  px-4  mb-1 border border-purple-300 shadow">
            <p className="text-center text-purple-800 text-[18px] font-normal font-['Alef']">{text}</p>
            <div className="mt-2">
              <textarea
                placeholder='אם תוכל/י להרחיב בכמה מילים:'
                dir="rtl"
                value={formData[key]?.comment || ''}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleCommentChange(key, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {key === 'ReligiousLevel' ? (
              <div className="flex space-x-4 justify-center">
                {['חרדי', 'חילוני', 'דתי'].map((option) => (
                  <label key={option} className="flex items-center text-center text-purple-800">
                    <input
                      type="radio"
                      name="ReligiousLevel"
                      value={option}
                      onChange={() => handleReligiousLevelChange(option)}
                      className="mr-1 text-center"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex space-x-4 justify-center text-purple-800">
                {hasRating ? (
                  [1, 2, 3, 4, 5].map((star) => (
                    <label key={star} className="flex items-center">
                      <input
                        type="radio"
                        name={key}
                        value={star}
                        onChange={() => handleRatingChange(key, star)}
                        className="mr-1 text-right "
                      />
                      {star}
                    </label>
                  ))
                ) : (
                  <div className="flex space-x-4 justify-center text-purple-800">
                    <label className="flex items-center text-right">
                      <input
                        type="radio"
                        name={key}
                        value="true"
                        onChange={() => handleBooleanChange(key, true)}
                        className="mr-1 text-right "
                      />
                      כן
                    </label>
                    <label className="flex items-center text-center text-purple-800">
                      <input
                        type="radio"
                        name={key}
                        value="false"
                        onChange={() => handleBooleanChange(key, false)}
                        className="mr-1 text-right "
                      />
                      לא
                    </label>
                  </div>
                )}
              </div>
            )}

          </div>

        ))}
        <div className="flex w-[114px] h-10 relative">
          <div className="w-[70px] h-[30px] left-0 top-0 absolute bg-orange-300 rounded-[20px]" />
          <div className="w-[31px] h-6 left-[4px] top-[3px] absolute bg-zinc-300 rounded-[20px]" />
        </div>

        <div className="w-[114px] h-10 relative">
          <div className="w-[70px] h-[30px] left-0 top-0 absolute bg-neutral-500 rounded-[20px]" />
          <div className="w-[31px] h-6 left-[35px] top-[3px] absolute bg-zinc-300 rounded-[20px]" />
        </div>

        <div className="w-full justify-center text-center mt-2 mb-1 items-center  h-[30.78px]">
          <button type='submit' className="shadow border-2 border-purple-600 px-3 rounded-md bg-purple-600 text-center text-indigo-50 text-xl font-bold font-['Alef'] leading-[24.86px]">שלח</button>
        </div>
      </form>
      <div className="text-center text-red-600 text-lg font-normal font-['Alef'] leading-[25px]">"התרשמותך חשובה לנו, אנא התנסח באופן קונקרטי, נעים ומכבד על מנת שאחרים יוכלו להפיק תועלת מהמידע שאתה משתף מבלי שאף אחד יפגע<br /> "התגובות עוברות בקרה ותגובה שתנוסח בצורה לא מכבדת תאלץ להימחק</div>
    </div>

  );
};

export default Rating;
