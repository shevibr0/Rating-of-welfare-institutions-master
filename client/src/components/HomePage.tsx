import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const nav = useNavigate()
  return (
    <div className="flex items-center justify-center h-screen bg-purple-500 bg-opacity-30">
      <img src="src/assents/profile.jpg" alt="Your Alt Text" className="w-60 h-60 rounded-full mr-8" />

      <div className="bg-transparent p-8 rounded-lg shadow-md w-96 h-100 relative border-2 border-orange-400">
        <div style={{ direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} >
          <br />
          <h2 className="text-xl font-semibold mb-2 text-purple-700 textAlign:center">מפה לעו"ס</h2>
          <p className="border-orange-400 text-lg mb-4" style={{ direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            הי, שמי אלישבע אינהורן, עובדת סוציאלית ומפתחת תוכנה. עבדתי בעבר 6 שנים בלשכת רווחה
            .במהלך שנות עבודתי נתקלתי רבות בצורך בחיפוש אחר מוסדות כמו פנימיות, מעונות יום, מועדוניות ועוד
            אך לא מצאתי אתר מסודר בו ניתן לחפש את כל מוסדות הרווחה בארץ ולקרוא תגובות וחוות דעת של עו"סיות אחרות
            על המקום. בסיום לימודי פיתוח התוכנה החלטתי לבנות מענה לצורך עבור עו"סים ועו"סיות בכל רחבי הארץ אשר בכוח השיתוף
            והדרוג של מוסדות שביקרו בהם יעזרו לעו"סים אחרים ויוכלו להנות ממידע מעודכן ומאימן.
            מוזמנת להוסיף חוות דעת ודרוג אודות מוסדות שהכרת באופן אישי ולהנות ממידע המתעדכן כל הזמן
          </p>

          <button className="flex items-center font-semibold mb-2 mt-4 border border-purple-500 text-purple-500 p-2 rounded-md mx-auto" onClick={() => nav("/institutes")}>
            הקליקי לכל מוסדות הרווחה בארץ
          </button>
        </div>
      </div>
    </div >
  );
};

export default HomePage;
