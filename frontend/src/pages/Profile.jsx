/* eslint-disable no-unused-vars */

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfilePost from '../components/ProfilePost';
import { useState, useContext, useEffect } from 'react';
import { URL } from '../url';
import axios from 'axios'
import { UserContext } from '../context/userContext';
import { useParams, useNavigate } from 'react-router-dom';


const Profile = () => {

  const navigate = useNavigate()
  const param = useParams().id
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [updated, setUpdated] = useState(false)
  const [posts, setPosts] = useState([])

  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext)

  const fetchProfile = async() => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id)
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
    } catch (error) {
      console.log(error);
    }
  }

  const handleUserUpdate = async () => {
    setUpdated(false)
    try {
      const res = await axios.put(URL + "/api/users/" + user._id, {username, email, password}, {withCredentials:true})
      console.log(res.data);
      setUpdated(true)
    } catch (error) {
      console.log(error);
      setUpdated(false)
    }
  }

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {withCredentials:true})
      setUser(null)
      navigate("/")
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUserPost =async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/"+user._id)
      setPosts(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => { fetchProfile() },[param])
  useEffect(() => { fetchUserPost() }, [])

  return <div>
    <Navbar/>
    <div className="px-8 md:px-[200px] mt-8 flex md:flex-row md:items-start flex-col-reverse">
      <div className="flex flex-col md:w-[70%] w-full">
        <h1 className="text-xl font-bold mb-4">Your Posts</h1>
        {posts?.map((p) => (
          <ProfilePost key={p._id} p={p}/>
        )
        )}
      </div>
      <div className="flex justify-start md:justify-end md:top-12 md:sticky items-start md:w-[30%] w-full md:items-end">
        <div className="flex flex-col space-y-4 items-start">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className='outline-none px-4 py-2 text-gray-500' placeholder='Your Username' />
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className='outline-none px-4 py-2 text-gray-500' placeholder='Your Email' />
        {/* <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='outline-none px-4 py-2 text-gray-500' placeholder='Your Password' /> */}
        <div className="flex items-center space-x-4 mt-8">
          <button onClick={handleUserUpdate} className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'>Update</button>
          <button onClick={handleUserDelete} className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'>Delete</button>
        </div>
        </div>
      </div>
      {updated && (
        <h3 className='text-green-500 text-sm mt-4 text-center'>User Updated Successfully!</h3>
      )}
    </div>
    <Footer/>
  </div>;
};
export default Profile;
