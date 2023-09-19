import authVideo from '../assets/videoauth.mp4';
import { AuthForm } from '../components';

const Auth = () => {
  return (
    <div className="w-full h-screen">
        <div className="relative w-full h-full">
            <video 
                src={authVideo}
                typeof='video/mp4'
                loop
                controls={false}
                muted
                autoPlay
                className='w-full h-full object-cover'
            />
        </div>
        <div className='absolute inset-0 bg-blackOverlay flex lg:justify-between justify-center items-center p-6 lg:px-24 lg:py-16 '>
            <h1 className='text-white text-4xl font-bold tracking-wide hidden lg:block'>Welcome :)</h1>
            <div className='w-full h-max sm:w-96 bg-white rounded-md flex flex-col px-4 py-6 overflow-y-auto'>
                <h2 className="font-mooli font-bold text-4xl text-center mb-4">Bookers</h2>
                <AuthForm/>
            </div>
        </div>
    </div>
  )
}

export default Auth