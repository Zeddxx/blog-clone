
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Loader from '../components/Loader';
import { URL } from '../url.js';
import HomePost from '../components/HomePost'



const MyBlogs = () => {
  const { search } = useLocation()
const { user } = useContext(UserContext)
// console.log(user);

  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)

  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id)
      // console.log(res.data);
      setPosts(res.data)
      if(res.data.length === 0){
        setNoResults(true)
      }else{
        setNoResults(false)
      }
      setLoader(false)
    } catch (error) {
      console.log(error);
      setLoader(true)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [search])
  return (
    <div className="">
        <Navbar />
            <div className="min-h-[80vh] px-8 md:px-[200px]">
            {loader ? <div className="h-[40vh] w-full flex items-center justify-center"><Loader/></div>:!noResults ?posts.map((post, i) => (
          <>
            <Link key={i} to={user ? `/posts/post/${post._id}`: "/login"}><HomePost key={post._id} post={post} /></Link>
          </>
        )) : <h3 className='text-center font-bold mt-16'>No Post Available</h3>}
            </div>
        <Footer />
    </div>
  )
};
export default MyBlogs;
