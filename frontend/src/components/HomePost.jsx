/* eslint-disable react/prop-types */
import {IF} from '../url.js'


const HomePost = ({post}) => {
  return (
      <div className="flex w-full mt-8 space-x-4">
        {/* Left */}
        <div className="w-[35%] h-[200px] flex justify-center items-center">
          <img src={IF + post.photo} alt="blog image" className='h-full w-full object-cover' />
        </div>

        {/* Right */}
        <div className="flex flex-col w-[65%]">
          <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'>
            {post.title}
          </h1>

          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p className="">@{post.username}</p>

            <div className="flex space-x-2">
              <p className="">{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p className="">{new Date(post.updatedAt).toString().slice(16, 21)}</p>
            </div>
          </div>

          <p className='text-sm'>{post.description.slice(0, 200) + '...read more'}</p>
        </div>
      </div>
    )
};
export default HomePost;
