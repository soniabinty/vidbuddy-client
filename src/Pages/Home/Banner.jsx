import React, { useContext, useState } from 'react';
import { IoVideocamOutline } from "react-icons/io5";
import video from '../../../src/assets/5767870-hd_1080_1920_25fps.mp4';
import { motion } from 'framer-motion';
import img from '../../../src/assets/1000028802-removebg-preview.png';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import AuthContext from '../../Provider/AuthContext';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser ,googleSignIn } = useContext(AuthContext)
  const handleGoogleLogin = () => {
    setIsLoading(true);
    googleSignIn()
    .then((result) =>{
      const user = result.user
      setUser(user)
         const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result.user?.photoURL,
      }})};
       


  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      <div
        className={`min-h-screen bg-gradient-to-b from-[#3d00a0] via-[#b027ff] to-[#e0b3fb] flex items-center justify-center px-6 relative overflow-hidden transition-all duration-300 ${
          isModalOpen ? 'filter blur-md' : ''
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

            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-bold bg-[#4e10b0] w-3/4 md:w-1/2 hover:bg-[#5a1dbd] transition-all border border-white/30 shadow-lg max-sm:mx-auto"
              aria-label="Join With VidBuddy"
            >
              Join With VidBuddy
            </motion.button>

            <Link to={'/login'}>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
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
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold bg-[#4e10b0] hover:bg-[#4e10b0] transition-all border border-white/30 shadow-lg ${
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
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Banner;