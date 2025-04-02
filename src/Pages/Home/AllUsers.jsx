import React from 'react';
import useUser from '../../assets/Hooks/useUser';
import { FaVideo } from 'react-icons/fa'; // Import video call icon

const AllUsers = () => {
  const [users] = useUser();

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
      {users.map((user) => (
        <div
          key={user.id}
          className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg flex items-end justify-center text-white"
          style={{ backgroundImage: `url(${user.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

       

          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {user.online ? 'Online' : 'Offline'}
          </div>

          {/* Name */}
          <div className="relative z-10 text-lg font-semibold mb-16">{user.name}</div>

          {/* Video Call Button */}
          <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#4e10b0] hover:bg-[#5a1dbd] transition-all text-white p-3 rounded-full shadow-lg  z-10">
            <FaVideo className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
