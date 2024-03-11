import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Navbar = () => {
    const nav = useNavigate()
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className="w-full h-[93px] absolute shadow">
                <div className="w-full h-full absolute bg-white shadow" />
                <div className="max-w-screen-xl mx-auto h-full flex justify-between items-center">
                    <div onClick={() => nav('/')} className="left-[1772px] top-[25px] absolute text-purple-500 text-[35px] font-normal font-['Alef'] leading-[45px] cursor-pointer hidden sm:block">אודות</div>
                    <div onClick={() => nav('/institutes')} className="left-[1502px] top-[26px] absolute text-purple-500 text-[35px] font-normal font-['Alef'] leading-[45px] cursor-pointer  hidden sm:block">מוסדות בארץ</div>
                    <div onClick={() => nav('/contact')} className="left-[831px] top-[27px] absolute text-purple-500 text-[45px] font-bold font-['Alef'] leading-[45px] cursor-pointer  hidden sm:block">צור קשר</div>
                    <div onClick={() => nav('/threeTop')} className="left-[1033px] top-[28px] absolute text-purple-500 text-[35px] font-normal font-['Alef'] leading-[45px] cursor-pointer  hidden sm:block">מוסדות בדירוג הגבוה ביותר</div>
                    {/* Menu icon for small screens */}
                    <div className="cursor-pointer sm:hidden" onClick={toggleMenu}>
                        ☰
                    </div>
                </div>
            </div>
            {/* Responsive menu */}
            {isMenuOpen && (
                <div className="bg-white sm:hidden">
                    <div className="max-w-screen-xl mx-auto flex flex-col items-center">
                        <div onClick={() => nav('/')} className="text-purple-500 text-[35px] font-normal font-['Alef'] leading-[45px] cursor-pointer mb-4">
                            אודות
                        </div>
                        <div onClick={() => nav('/institutes')} className="text-purple-500 text-[35px] font-normal font-['Alef'] leading-[45px] cursor-pointer mb-4">
                            מוסדות בארץ
                        </div>
                        <div onClick={() => nav('/contact')} className="text-purple-500 text-[35px] font-bold font-['Alef'] leading-[45px] cursor-pointer mb-4">
                            צור קשר
                        </div>
                        <div onClick={() => nav('/threeTop')} className="text-purple-500 text-[35px] font-normal font-['Alef'] leading-[45px] cursor-pointer mb-4">
                            מוסדות בדירוג הגבוה ביותר
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Navbar;