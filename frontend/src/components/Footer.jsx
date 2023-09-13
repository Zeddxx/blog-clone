

const Footer = () => {
  return (
  <>
    <div className='mt-8 w-full bg-black px-8 md:px-[500px] flex justify-between text-sm md:text-md py-8 md:mt-8'>
    <div className="flex flex-col text-white">
      <p className="">Featured</p>
      <p className="">Most Viewed</p>
      <p className=''>Reader Choice</p>
    </div>
    <div className="flex flex-col text-white">
      <p className="">Forum</p>
      <p className="">Support</p>
      <p className=''>Recent Post</p>
    </div>
    <div className="flex flex-col text-white">
      <p className="">Privacy Policy</p>
      <p className="">About Us</p>
      <p className=''>Terms and Conditions</p>
      <p className="">Terms of Services</p>
    </div>
  </div>
  <p className="py-2 pb-2 text-center text-white bg-black">All right reserved @BlogDev</p>
  </>
  )
};
export default Footer;
