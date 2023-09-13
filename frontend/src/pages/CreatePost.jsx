import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import { ImCross } from "react-icons/im";
import { useState, useContext } from "react";
import { UserContext } from './../context/userContext';
import { URL } from './../url';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)
  // console.log(file);
  const {user} = useContext(UserContext)

  const navigate = useNavigate()


  const deleteCategory = (index) => {
    let updatedCats = [...cats]
    updatedCats.splice(index, 1)
    setCats(updatedCats)
  };

  const addCategory = () => {
    let updatedCats =[...cats]
    updatedCats.push(cat)
    setCat("")
    setCats(updatedCats)
  };

  const handleCreate = async(e) => {
    e.preventDefault()
    const post = {
      title,
      description,
      username:user.username,
      userId:user._id,
      categories:cats
    }
    
    console.log(user);
    if(file){
      const data = new FormData()
      const filename = Date.now()+file.name
      data.append("img", filename)
      data.append("file", file)
      post.photo=filename

      try{
        const imgUpload = await axios.post(URL + "/api/upload", data)
        console.log(imgUpload.data);
      }catch(error){
        console.log(error);
      }
    }
    // Post upload
    try {
      const res = await axios.post(URL + "/api/posts/create",post, {withCredentials:true})
      navigate("/posts/post/" + res.data._id)
      // console.log(res.data);

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
          onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
          />
          <input onChange={(e) => setFile(e.target.files[0])} type="file" className="px-4" />
          <div className="flex flex-col ">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                type="text"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter Post Category"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* Categories */}
            <div className="flex px-4 mt-3">
                {cats?.map((c, index) => (
                    <div key={index} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                    <p>{c}</p>
                    <p
                      onClick={() => deleteCategory(index)}
                      className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                    >
                      <ImCross />
                    </p>
                  </div>
                ))}
            </div>
          </div>
          {/* textarea */}
          <textarea
          onChange={(e) => setDescription(e.target.value)}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter Post Description"
          />
          <button onClick={handleCreate} className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg">
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default CreatePost;
