/* eslint-disable react/prop-types */
import {IF} from '../url.js'

const ProfilePost = ({p}) => {
  return (
    <div className="flex w-full mt-8 space-x-4">
        {/* Left */}
        <div className="w-[35%] h-[200px] flex justify-center items-center">
          <img src={IF+p.photo} alt={p.title} className='h-full w-full object-cover' />
        </div>

        {/* Right */}
        <div className="flex flex-col w-[65%]">
          <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'>
            {p.title}
          </h1>

          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p className="">@{p.username}</p>

            <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(p.updatedAt).toString().slice(16,24)}</p>
            </div>
          </div>

          <p className='text-sm'>{p.description}</p>
        </div>
      </div>
  )
};
export default ProfilePost;
