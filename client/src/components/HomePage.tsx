import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const nav = useNavigate()
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="bg-orange-100">
      <button className="lg:hidden md:hidden sm:hidden" onClick={() => { setIsOpen(!isOpen) }} >
        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 11h16M4 16h16" />
        </svg>
      </button>
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
      <nav className="hidden lg:flex md:flex sm:flex left-0 top-0 shadow bg-white  justify-center  items-center  text-purple-500 lg:text-2xl  lg:h-[47px] md:text-xl md:h-[40px] sm:text-s  sm:h-[20px] mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer space-x-11">
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
        <div onClick={() => nav('/institutesCategory')}>
          מוסדות בארץ
        </div>
        <div className='font-bold' onClick={() => nav('/')}>
          אודות
        </div>
      </nav>

      <div className="flex mt-7 items-center justify-center">
        <img className="max-w-[40%] lg:max-w-[25%] md:max-w-[22%] sm:max-w-[25%]" src="public/לוגו עוס.svg" alt="Logo" />
      </div>

      <div className="flex items-center justify-center  flex-wrap ">
        <div className="ml-8 mr-8 w-[578px] h-[600px] lg:w-[678px] lg:mr-2 md:w-[678px] md:h-[440px] sm:w-[578px] sm:h-[540px] mt-4   p-1 text-center text-purple-500 text-m font-bold font-['Ploni Yad v2 AAA'] leading-[42.67px] tracking-wider bg-red-200 ">
          .שמי אלישבע אינהורן, עובדת סוציאלית ומפתחת תוכנה          <br />.עבדתי בלשכות רווחה שנים רבות ונתקלתי בצורך במציאת ידע וחוות דעת עדכניות על מוסדות רווחה: פנימיות, דיור מוגן, מעונות, מועדוניות ועוד<br />פיתחתי ובניתי את האתר על מנת לענות על צורך זה ולאפשר מידע פתוח ומדוייק לכל עו"ס ועו"סית בישראל<br />אני מזמינה אתכם להנות מהמידע ובמקביל לכתוב את חוות דעתכן על מוסדות שיצא לכם להכיר, להעלות תמונות של המוסד ולעדכן פרטים רלוונטיים<br />לכל שאלה, בקשה או הבהרה מוזמנים לכתוב לי<br /> אני קוראת הכל <br />שלכם אלישבע
        </div>
        <div className="ml-4 mr-4 lg:w-[355px] lg:h-[438px] lg:ml-1 md:w-[400px] md:h-[350px] sm:w-[300px]  mt-4 p-2 text-center text-purple-500 text-m font-normal font-['Ploni Yad v2 AAA']  leading-[42.67px] tracking-wider  border-2 border-orange-300 ">
          <span className="text-center text-purple-500  text-m font-bold font-['Ploni Yad v2 AAA'] leading-[45px] tracking-widest">'האתר 'מפה לעו"ס</span><br />
          הוקם בשנת 2024 האתר הינו דינמי ומתעדכן ומטרתו היא איתור כל המוסדות עם סמל רווחה אשר קיימים בארץ <br /> בנוסף, יש אפשרות לכל אחד ואחת לכתוב חוות דעת ולדרג את הפרמטרים של המוסד לפי ההתרשמות האישית  <br /> כך שתהיה אפשרות להנות ממידע אמין ומעודכן
        </div>
      </div>



      <div className="h-3  mt-10  flex items-center justify-center ">
        <button onClick={() => nav('/institutes')} className="rounded-md text-right pr-6 pl-6 text-indigo-50 text-[28px] font-bold font-['Alef'] leading-[45px]  bg-purple-500  hover:bg-orange-200  hover:text-purple-500 hover:border-purple-500" style={{ transitionProperty: 'background-color, color' }}>
          הקליקי לכל מוסדות הרווחה בארץ
        </button>
      </div>

      <div className="w-full bottom-0 mt-10 left-0  flex justify-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img className="w-[20.15px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="public/לינקדאין.svg" alt="LinkedIn" />
            <a href="https://www.linkedin.com/in/elisheva-einhoren-43b1b3220/" target="_blank" rel="noopener noreferrer">
              <img className="w-[20.15px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="public/לינקדאין מעבר עכבר.svg" alt="LinkedIn Hover" />
            </a>
          </div>
          <div className="relative">
            <img className="w-[26.55px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="public/מייל.svg" alt="Email" />
            <a href="mailto:mepe.leos@gmail.com">
              <img className="w-[26.55px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="public/מייל מעבר עכבר.svg" alt="Email" />
            </a>
          </div>
          <div className="relative">
            <img className="w-[18.96px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="public/אינסטגרם.svg" alt="Instagram" />
            <a href="https://www.instagram.com/elisheva_einhoren/" target="_blank" rel="noopener noreferrer">
              <img className="w-[18.96px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="public/אינסטגרם מעבר עכבר.svg" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </div >
  )

}


export default HomePage;
