import { useContext } from 'react';
import { FaHome, FaComments } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from 'react-router';
import { FaSearch } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import UserContext from '../context/userContext';

const Navbar = () => {
    const nav = useNavigate()
    const { user } = useContext(UserContext)

    return (
        <>
            <nav className="flex left-0 top-0  bg-orange-100 justify-center items-center text-3xl text-purple-500  font-normal  font-['Ploni Yad v2 AAA'] h-[80px]  cursor-pointer space-x-11">
                {!user && (
                    <>
                        <div onClick={() => nav('/login')} className='transition duration-100 hover:text-red-300'> <IoMdLogIn /></div>
                    </>
                )}
                {user && (
                    <>
                        <div onClick={() => nav('/logout')} className='transition duration-100 hover:text-red-300' > <BiLogOutCircle /></div>
                    </>
                )}
                <div onClick={() => nav('/contact')} className='transition duration-100 hover:text-red-300'> <FaComments /></div>
                <div onClick={() => nav('/institutes')} className='transition duration-100 hover:text-red-300' > <FaSearch /></div>
                <div onClick={() => nav('/threeTop')} className='transition duration-100 hover:text-red-300'><GiQueenCrown /></div>
                <div onClick={() => nav('/')} className='transition duration-100 hover:text-red-300'><FaHome /></div>
            </nav>
            <div className='flex justify-center'>
                {user && (
                    <div className="text-lg text-purple-500 font-semibold text-center  font-['Ploni Yad v2 AAA']">
                        {user.name}  שלום
                    </div>
                )}
            </div>
        </>
        // <div>
        //     <div className="w-full h-[93px] absolute shadow">
        //         <div className="w-full h-full absolute bg-white shadow" />
        //         <div className="max-w-screen-xl mx-auto h-full flex justify-between items-center">
        //             <div onClick={() => nav('/')} className="left-[1772px] top-[25px] absolute text-purple-500 text-[35px] font-normal font-['Alef'] leading-[45px] cursor-pointer hidden sm:block">אודות</div>
        //             <div onClick={() => nav('/institutes')} className="left-[1502px] top-[26px] absolute text-purple-500 text-[35px] font-normal font-['Alef'] leading-[45px] cursor-pointer  hidden sm:block">מוסדות בארץ</div>
        //             <div onClick={() => nav('/contact')} className="left-[831px] top-[27px] absolute text-purple-500 text-[45px] font-bold font-['Alef'] leading-[45px] cursor-pointer  hidden sm:block">צור קשר</div>
        //             <div onClick={() => nav('/threeTop')} className="left-[1033px] top-[28px] absolute text-purple-500 text-[35px] font-normal font-['Alef'] leading-[45px] cursor-pointer  hidden sm:block">מוסדות בדירוג הגבוה ביותר</div>
        //         </div>
        //     </div>

        // </div >
    );
};


export default Navbar;