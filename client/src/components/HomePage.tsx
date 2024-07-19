import { useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const HomePage = () => {
  const nav = useNavigate()



  return (
    <div className="bg-orange-100">
      <Navbar />
      <div className="flex mt-3 justify-center">
        <img className="w-48" src="public/לוגו עוס.svg" alt="Logo" />
      </div>
      <div className="flex items-center justify-center flex-wrap mt-3">
        <div className="max-w-2xl w-full mx-4 p-5 text-center text-purple-500 text-m font-bold font-['Ploni Yad v2 AAA'] leading-[33px]  bg-red-200 shadow-sm shadow-white rounded-3xl">
          .שמי אלישבע אינהורן, עובדת סוציאלית ומפתחת תוכנה     <br />.עבדתי בלשכות רווחה שנים רבות ונתקלתי בצורך במציאת ידע וחוות דעת עדכניות על מוסדות רווחה: פנימיות, דיור מוגן, מעונות, מועדוניות ועוד<br />פיתחתי ובניתי את האתר על מנת לענות על צורך זה ולאפשר מידע פתוח ומדוייק לכל עו"ס ועו"סית בישראל<br />אני מזמינה אתכם להנות מהמידע ובמקביל לכתוב את חוות דעתכן על מוסדות שיצא לכם להכיר, להעלות תמונות של המוסד ולעדכן פרטים רלוונטיים<br />לכל שאלה, בקשה או הבהרה מוזמנים לכתוב לי<br /> אני קוראת הכל <br />שלכם אלישבע
        </div>
        {/* <div className="ml-4 mr-4 lg:w-[355px] lg:h-[438px] lg:ml-1 md:w-[400px] md:h-[350px] sm:w-[300px]  mt-4 p-2 text-center text-purple-500 text-m font-normal font-['Ploni Yad v2 AAA']  leading-[42.67px] tracking-wider  border-2 border-orange-300 ">
          <span className="text-center text-purple-500  text-m font-bold font-['Ploni Yad v2 AAA'] leading-[45px] tracking-widest">'האתר 'מפה לעו"ס</span><br />
          הוקם בשנת 2024 האתר הינו דינמי ומתעדכן ומטרתו היא איתור כל המוסדות עם סמל רווחה אשר קיימים בארץ <br /> בנוסף, יש אפשרות לכל אחד ואחת לכתוב חוות דעת ולדרג את הפרמטרים של המוסד לפי ההתרשמות האישית  <br /> כך שתהיה אפשרות להנות ממידע אמין ומעודכן
        </div> */}
      </div>


      <div className="flex justify-center mt-2">
        <button onClick={() => nav('/institutes')} className="font-bold   bg-purple-500 font-['Ploni Yad v2 AAA'] text-orange-100  py-2 px-4 rounded-full hover:animate-button-push">
          חיפוש
        </button>
      </div>

      <div className="w-full bottom-0 mt-2 left-0  flex justify-center text-purple-500">
        <div className="flex items-center gap-4 rounded-lg">
          <div className="relative transition duration-100 hover:text-red-300 rounded-2xl text-2xl ">
            <a href="https://www.linkedin.com/in/elisheva-einhoren-43b1b3220/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className='rounded-full' />
            </a>
          </div>

          <div className="relative transition duration-100 hover:text-red-300 text-2xl">
            <a href="mailto:mepe.leos@gmail.com" className='rounded-full'>
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
          <div className="relative">
            <a className='transition duration-100 hover:text-red-300 text-2xl' href="https://www.instagram.com/elisheva_einhoren/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className='rounded-full' />
            </a>
          </div>
        </div>
      </div>
    </div >
  )

}


export default HomePage;
