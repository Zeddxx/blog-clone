
import { useContext } from 'react';
import { UserContext } from './../context/userContext';
import axios from 'axios'
import { URL } from './../url';
import { useNavigate, Link } from 'react-router-dom';

export const Menu = () => {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
            const res = await axios.get(URL + "/api/auth/logout", {withCredentials:true})
            // console.log(res);
            setUser(null)
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }
  return (
  <div className="z-10 bg-black w-[200px] flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md px-4 py-2 space-y-4">
    {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3>}
    {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h3>}
    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/"+user._id}>Profile</Link></h3>}
    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h3>}
    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/myblogs/" + user._id}>My blogs</Link></h3>}
    {user && <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>}
  </div>
    )
};
