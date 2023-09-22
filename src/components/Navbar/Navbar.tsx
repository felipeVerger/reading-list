import { FC } from 'react'
import { urlFor } from '../../client';
import useProfileModal from '../../hooks/useProfileModal';
import { User } from '../../types/user.type';

interface Props {
  user: User
}

const Navbar:FC<Props> = ({ user }) => {
  const { onOpen } = useProfileModal();
  
  return (
    <nav className="w-full flex gap-6">
      <div className="w-full h-20 bg-homeContentBg px-4 rounded-lg flex justify-between items-center">
        <h1 className='text-white font-abrilFatface text-4xl font-semibold animate-fade-right'>Bookerz</h1>
      </div>
      <button
        onClick={onOpen}
        className="w-20 h-20 rounded-full border-none overflow-hidden hover:animate-jump"
      >
        <img
          src={urlFor(user.image)}
          alt="profile button"
          className="w-full h-full object-cover"
        />
      </button>
    </nav>
  );
};

export default Navbar