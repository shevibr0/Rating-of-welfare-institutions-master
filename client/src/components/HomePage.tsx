import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const nav = useNavigate()
  return (
    <div className="w-[1920px] h-[1080px] relative bg-white">
      <div className="left-[1535px] top-[61px] absolute text-black text-3xl font-normal font-['Inter']">אודות</div>
      <div onClick={() => nav('/institutes')} className="left-[1189px] top-[61px] absolute text-black text-3xl font-normal font-['Inter']">
        מוסדות בארץ
      </div>
      <div onClick={() => nav('/contact')} className="left-[306px] top-[61px] absolute text-black text-3xl font-normal font-['Inter']">צור קשר</div>
      <div className="w-[999px] h-[826px] left-[727px] top-[188px] absolute border border-black" />
      <div className="w-[603px] h-[720px] left-[194px] top-[238px] absolute bg-zinc-300" />
      <div className="left-[368px] top-[532px] absolute text-black text-[40px] font-normal font-['Inter']">תמונת פרופיל</div>
      <div className="w-[771px] h-[584px] left-[885px] top-[346px] absolute text-right text-black text-xl font-normal font-['Inter'] leading-[45px]">מפה לע”וס<br />הי שמי אלישבע אינהורן עובדת סוציאלית ומפתחת תוכנה<br />עבדתי 6 שנים בלשכות רווחה. במהלך שנות עבודתי נתקלתי רבות בצורך בחיפוש מידע עדכני שך איש קשר, סוג האוכלוסייה אודות מוסדות כמו פנימיות , מעונות יום, מועדניות ועוד  אך לא מצאתי אתר מסודר בו ניתן למצוא את כל המוסדות הרווחה בארץ ולקרוא תגובות וחוות דעת של עו”סיות אחרות על המקום. בשל כך החלטתי לבנות מענה לצורך זה עבור עוסים ועוסיות בכל רחבי הארץ אשר בכח השיתוף והדירוג של מוסדות שביקרו בהם יעזרו לעוסים אחרים ויוכלו להנות ממידעמעודכן ומאימן מוזמנת להוסיף חוות דעת ודירוג אודות מוסדות שהכרת באופן אישי ולהנות ממידע המתעדכן בזמן אמת<br /></div>
      <div onClick={() => nav('/threeTop')} className="left-[567px] top-[64px] absolute text-black text-3xl font-normal font-['Inter']">3 מוסדות בדירוג הגבוה ביותר</div>
      <div className="w-[99px] h-[0px] left-[1522px] top-[117px] absolute border-2 border-black"></div>
      <div className="w-[488px] h-[61px] left-[1026px] top-[897px] absolute bg-zinc-300 border border-black" />
      <button className="left-[1081px] top-[903px] absolute text-right text-black text-[28px] font-normal font-['Inter'] leading-[45px]" onClick={() => nav("/institutesCategory")}>
        הקליקי לכל מוסדות הרווחה בארץ
      </button>
    </div >
    // <div className="w-[1920px] h-[1080px] relative bg-white">
    //   <img src="src/assents/profile.jpg" alt="Your Alt Text" className="w-60 h-60 rounded-full mr-8" />

    //   <div className="bg-white p-8 rounded-lg shadow-md md:w-2/3 border-2 border-orange-400">
    //     <div style={{ direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} >
    //       <br />
    //       <h2 className="text-xl font-semibold mb-2 text-purple-700 textAlign:center">מפה לעו"ס</h2>
    //       <p className="border-orange-400 text-lg mb-4" style={{ direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    //         הי, שמי אלישבע אינהורן, עובדת סוציאלית ומפתחת תוכנה <br /> עבדתי 6 שנים בלשכות רווחה.
    //         במהלך שנות עבודתי נתקלתי רבות בצורך בחיפוש מידע עדכני של איש קשר, סוג אוכלוסייה אודות מוסדות <br /> כמו פנימיות, מעונות יום, מועדוניות ועוד.
    //         אך לא מצאתי אתר מסודר בו ניתן לחפש את כל מוסדות הרווחה בארץ <br />ולקרוא תגובות וחוות דעת של עו"סיות אחרות
    //         על המקום. <br />בשל כך, החלטתי לבנות מענה לצורך זה עבור עו"סים ועו"סיות בכל רחבי הארץ אשר בכוח השיתוף
    //         והדרוג של מוסדות שביקרו בהם יעזרו לעו"סים אחרים ויוכלו להנות ממידע מעודכן ומאימן<br />
    //         מוזמנת להוסיף חוות דעת ודרוג אודות מוסדות שהכרת באופן אישי ולהנות ממידע המתעדכן בזמן אמת.
    //       </p>

    //       <button className="flex items-center font-semibold mb-2 mt-4 border border-purple-500 text-purple-500 p-2 rounded-md mx-auto" onClick={() => nav("/institutes")}>
    //         הקליקי לכל מוסדות הרווחה בארץ
    //       </button>
    //     </div>
    //   </div>
    // </div >
  );
};

export default HomePage;
