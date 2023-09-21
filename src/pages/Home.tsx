import { urlFor } from "../client";
import useProfileModal from "../hooks/useProfileModal"
import ModalProvider from "../providers/ModalProvider"
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const { onOpen } = useProfileModal();
  const user = fetchUser();
  
  console.log(user.homeBackground);
  

  return (
    <div className={`w-full h-screen ${user.homeBackground ? '' : 'bg-home-bg'} bg-cover relative`}>
      {user.homeBackground && <img src={urlFor(user.homeBackground)} alt="home background" className="w-full h-full object-cover"/>}
      <ModalProvider/>
      <button onClick={onOpen} className="absolute right-5 top-5 w-20 h-20 rounded-full border-none overflow-hidden hover:animate-jump">
        <img src={urlFor(user.image)} alt="profile button" className="w-full h-full object-cover"/>
      </button>
    </div>
  )
}

export default Home