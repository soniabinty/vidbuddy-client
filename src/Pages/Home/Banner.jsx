import React, { useContext, useState } from 'react';
import { IoVideocamOutline } from "react-icons/io5";
import video from '../../../src/assets/5767870-hd_1080_1920_25fps.mp4';
import { motion } from 'framer-motion';
import img from '../../../src/assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import AuthContext from '../../Provider/AuthContext';
 
import useAxiosPublic from '../../assets/Hooks/useAxiosPublic';

const sprinkleVariants = {
  animate: {
    opacity: [0, 1, 0],
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, 15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Banner = () => {
  const navigate = useNavigate();
  const { setUser, googleSignIn } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    photo: null, 
    sex: '',
    dob: '',
  });
  const [googleUser, setGoogleUser] = useState(null);
  const axiosPublic = useAxiosPublic() 

  
  const image_hosting_key = import.meta.env.VITE_image_hosting_apikey;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError(null);
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setGoogleUser(user); 
        setIsLoading(false);
        setIsModalOpen(false);
        setIsFormModalOpen(true);
      })
      .catch((error) => {
        console.error("Google Login Failed:", error);
        setError("Login failed. Please try again.");
        setIsLoading(false);
      });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], 
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    
    if (!formData.photo || !formData.sex || !formData.dob) {
      setError("Please fill in all fields.");
      return;
    }

   
    const today = new Date();
    const dob = new Date(formData.dob);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 18) {
      setError("You must be at least 18 years old.");
      return;
    }

    setIsLoading(true);

    try {
     
      const imageFile = new FormData();
      imageFile.append('image', formData.photo);
      const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log("ImgBB Response:", imageRes.data);
      
      if (!imageRes.data || !imageRes.data.data || !imageRes.data.data.url) {
        throw new Error("Invalid ImgBB response");
      }
      
      const photoURL = imageRes.data.data.url;
      
      const userInfo = {
        email: googleUser?.email,
        name: googleUser?.displayName,
        photo: photoURL,
        sex: formData.sex,
        dob: formData.dob,
      };

     
      setGoogleUser(userInfo);
      console.log("Google User:", googleUser);
  
      await axiosPublic.post('/users', userInfo); 

      setIsLoading(false);
      setIsFormModalOpen(false);
      navigate('/alluser');
    } catch (error) {
      console.error("Error uploading photo or submitting form:", error);
      setError("Failed to submit form. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      <div
        className={`min-h-screen bg-gradient-to-b from-[#3d00a0] via-[#b027ff] to-[#e0b3fb] flex items-center justify-center px-6 relative overflow-hidden transition-all duration-300 ${
          isModalOpen || isFormModalOpen ? 'filter blur-md' : ''
        }`}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className='absolute w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl opacity-30 top-10 left-10'
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className='absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl opacity-30 bottom-10 right-10'
          />
          <motion.div 
            animate={{ x: [-50, 50, -50], y: [50, -50, 50] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className='absolute w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-3xl opacity-30 top-1/3 left-1/3'
          />

          {/* Sprinkle Effect */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              variants={sprinkleVariants}
              animate="animate"
              className='absolute w-2 h-2 bg-white rounded-full opacity-0'
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}

          {/* Floating Glow Orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              variants={floatingVariants}
              animate="animate"
              className='absolute w-10 h-10 bg-blue-400/30 rounded-full blur-xl'
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
              }}
            />
          ))}
        </div>
        
        <div className='flex flex-col md:flex-row items-center justify-between w-full max-w-6xl relative z-10'>
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='flex-1 text-center md:text-left'
          >
            <img className='w-44' src={img} alt="VidBuddy Logo" />
            <h2 className='text-3xl md:text-7xl font-extrabold bg-gradient-to-r from-[#fff] via-[#e0b3fb] to-[#b027ff] text-transparent bg-clip-text leading-tight'>
              Talk to strangers,<br /> Make friends!
            </h2>
            <p className='text-white mt-4 text-lg md:max-w-md opacity-90'>
              Explore and video chat with thousands of people worldwide who are eager to talk with you.
            </p>
            {!googleUser && (
  <motion.button
    onClick={() => setIsModalOpen(true)}
    whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.8)" }}
    whileTap={{ scale: 0.95 }}
    className="mt-5 flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-bold bg-[#4e10b0] w-3/4 md:w-1/2 hover:bg-[#5a1dbd] transition-all border border-white/30 shadow-lg max-sm:mx-auto"
    aria-label="Join With VidBuddy"
  >
    Join With VidBuddy
  </motion.button>
)}

           
         
            <Link to={'/alluser'}>
              <motion.button 
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                className='mt-5 flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-bold bg-[#4e10b0] w-3/4 md:w-1/2 hover:bg-[#5a1dbd] transition-all border border-white/30 shadow-lg max-sm:mx-auto'
                aria-label="Make a Video Chat"
              >
                <IoVideocamOutline className='text-2xl' />
                Make A Video Chat
              </motion.button>
            </Link>
          </motion.div>

          {/* Video Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
            className='flex-1 relative w-full md:w-1/2 flex justify-center mt-10 md:mt-0'
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className='relative w-[400px] h-[600px] bg-white/10 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-white/20'
            >
              <video
                autoPlay
                loop
                muted
                className='w-full h-full object-cover rounded-xl'
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Google Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-b from-[#3d00a0] to-[#b027ff] text-white rounded-xl p-8 shadow-2xl w-full max-w-md border border-white/20"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Close Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img className='w-44 mx-auto mb-4' src={img} alt="VidBuddy Logo" />
            
            <div className="flex justify-center">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold bg-[#4e10b0] hover:bg-[#5a1dbd] transition-all border border-white/30 shadow-lg ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Sign in with Google"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <>
                    <FaGoogle className="text-xl" />
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="mt-4 text-red-400 text-center">{error}</p>
            )}
          </motion.div>
        </div>
      )}

      {/* Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsFormModalOpen(false)}
          ></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-b from-[#3d00a0] to-[#b027ff] text-white rounded-xl p-8 shadow-2xl w-full max-w-md border border-white/20"
          >
            <button
              onClick={() => setIsFormModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Close Form Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img className='w-44 mx-auto mb-4' src={img} alt="VidBuddy Logo" />
            <h2 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h2>

            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="photo" className="block text-sm font-medium mb-1">
                  Profile Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#b027ff] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#4e10b0] file:text-white hover:file:bg-[#5a1dbd]"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="sex" className="block text-sm font-medium mb-1">
                  Sex
                </label>
                <select
                  id="sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#b027ff]"
                  required
                >
                  <option value="" disabled>Select your sex</option>
                  <option className='text-black' value="Male">Male</option>
                  <option className='text-black' value="Female">Female</option>
                  <option className='text-black' value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="dob" className="block text-sm font-medium mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#b027ff]"
                  required
                />
              </div>

              {error && (
                <p className="mb-4 text-red-400 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold bg-[#4e10b0] hover:bg-[#5a1dbd] transition-all border border-white/30 shadow-lg ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Submit Profile"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Banner;