import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const nav = useNavigate()
  return (
    <div className="bg-orange-100 w-full  ">
      <nav className="left-0 top-0 shadow bg-white flex justify-around items-center text-purple-500 lg:text-3xl lg:h-[80px] md:text-2m md:h-[30px] sm: font-normal font-['Alef'] leading-[45px] cursor-pointer">
        <div className="" onClick={() => nav('/login')}>
          הרשמה
        </div>
        <div className="" onClick={() => nav('/contact')}>
          צור קשר
        </div>
        <div className="" onClick={() => nav('/threeTop')}>
          מוסדות בדירוג הגבוה ביותר
        </div>
        <div className="" onClick={() => nav('/institutesCategory')}>
          מוסדות בארץ
        </div>
        <div className="font-bold" onClick={() => nav('/about')}>
          אודות
        </div>
      </nav>
      <div className="flex mt-7 items-center justify-center" >
        <img src="public/לוגו עוס.svg" alt="Logo" />
      </div>
      <div className="flex  items-center justify-center ">
        <div className="w-[778px] h-[538px] mt-10 mr-8  p-8 text-center text-purple-500 text-xl font-normal font-['Ploni Yad v2 AAA'] leading-[45px] tracking-wider bg-red-200 ">
          שמי אלישבע אינהורן, אני עובדת סוציאלית ומפתחת תוכנה. עבדתי בלשכות רווחה שנים רבות ונתקלתי בצורך במציאת ידע וחוות דעת עדכניות על מוסדות רווחה: פנימיות, דיור מוגן, מעונות, מועדוניות ועוד.<br />פיתחתי ובניתי את האתר על מנת לענות על צורך זה ולאפשר מידע פתוח ומדוייק לכל עו"ס ועו"סית בישראל.<br />אני מזמינה אתכם להנות מהמידע ובמקביל לכתוב את חוות דעתכן על מוסדות שיצא לכם להכיר, להעלות תמונות של המוסד ולעדכן פרטים רלוונטיים.<br />לכל שאלה, בקשה או הבהרה מוזמנים לכתוב לי.<br /><br />שלכם אלישבע
        </div>
        <div className="w-[355px]  h-[538px] mt-10 p-8 text-center text-purple-500 text-xl font-normal font-['Ploni Yad v2 AAA'] leading-[45px] tracking-wider  border-2 border-orange-300 ">
          <span className="text-center text-purple-500 text-[25px]  font-bold font-['Ploni Yad v2 AAA'] leading-[45px] tracking-widest">האתר "מפה לעו"ס"</span><br />
          הוקם בשנת 2024 האתר הינו דינמי ומעדכן ומטרתו היא איתור כל המוסדות עם סמל רווחה אשר קיימים בארץ. בנוסף, יש אפשרות לכל אחד ואחת לכתוב חוות דעת ולדרג את הפרמטרים של המוסד לפי ההתרשמות האישית. כך שתהיה אפשרות להנות ממידע אמין ומעודכן.
        </div>
      </div>


      <div className="w-full flex mt-10 justify-around items-center">
        <button onClick={() => nav('/institutes')} className="text-right p-1 text-indigo-50 text-[28px] font-bold font-['Alef'] leading-[45px]  bg-purple-500  hover:bg-orange-200  hover:text-purple-500 hover:border-purple-500" style={{ transitionProperty: 'background-color, color' }}>
          הקליקי לכל מוסדות הרווחה בארץ
        </button>
      </div>

      <div className="w-full bottom-0 mt-10 left-0  flex justify-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img className="w-[20.15px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="public/לינקדאין.svg" alt="LinkedIn" />
            <img className="w-[20.15px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="public/לינקדאין מעבר עכבר.svg" alt="LinkedIn Hover" />
          </div>
          <div className="relative">
            <img className="w-[26.55px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="public/מייל.svg" alt="Email" />
            <img className="w-[26.55px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="public/מייל מעבר עכבר.svg" alt="Email" />
          </div>
          <div className="relative">
            <img className="w-[18.96px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="public/אינסטגרם.svg" alt="Instagram" />
            <img className="w-[18.96px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="public/אינסטגרם מעבר עכבר.svg" alt="Instagram" />
          </div>
        </div>
      </div>
    </div >
  )

}


export default HomePage;
