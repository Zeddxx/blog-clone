import HomePost from "../components/HomePost";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios'
import { URL } from '../url';
import { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom'
import Loader from '../components/Loader';
import { UserContext } from '../context/userContext';

const Home = () => {
const { search } = useLocation()
const { user } = useContext(UserContext)
// console.log(user);

  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)

  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + "/api/posts/" + search)
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
    <>
    <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? <div className="h-[40vh] w-full flex items-center justify-center"><Loader/></div>:!noResults ?posts.map((post, i) => (
          <>
            <Link key={i} to={user ? `/posts/post/${post._id}`: "/login"}><HomePost key={post._id} post={post} /></Link>
          </>
        )) : <h3 className='text-center font-bold mt-16'>No Post Available</h3>}
      </div>
      <Footer />
    </>
  );
};
export default Home;
