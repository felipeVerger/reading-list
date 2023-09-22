import { urlFor } from "../client";
import { Navbar } from "../components";
import ModalProvider from "../providers/ModalProvider"
import { fetchUser } from "../utils/fetchUser";
import defaultHomeBg from '../assets/images/bg-home.jpg'; 

const Home = () => {
  const user = fetchUser();

  const backgroundImageStyle = {
    backgroundImage: user.homeBackground ? `url(${urlFor(user.homeBackground).url()})` : `url(${defaultHomeBg})`,
  };

  return (
    <div className={`w-full h-screen bg-cover bg-no-repeat bg-center p-6`} style={backgroundImageStyle}>
      <ModalProvider/>
      <Navbar user={user}/>
    </div>
  )
}

export default Home