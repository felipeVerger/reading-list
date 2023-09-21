import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import { Avatar, User } from '../../types/user.type'

import { BiEdit, BiSolidImageAdd } from 'react-icons/bi';
import { FcRemoveImage } from 'react-icons/fc';
import { client, urlFor } from '../../client';
import { SanityImageAssetDocument } from '@sanity/client';
import { Loader } from '..';

interface Props {
  user: User;
  setActiveComponent: Dispatch<SetStateAction<'main' | 'edit' | 'books'>>;
}

interface LoadingState {
  isAvatarLoading: boolean;
  isHomeBgLoading: boolean;
}

interface WrongImageTypeState {
  isAvatarError: boolean;
  isHomeBgError: boolean;
}

const EditProfile:FC<Props> = ({ user, setActiveComponent }) => {
  const [avatar, setAvatar] = useState<null | Avatar | SanityImageAssetDocument>(null);
  const [homeBg, setHomeBg] = useState<null | Avatar | SanityImageAssetDocument>(null);
  const [username, setUsername] = useState('');
  const [wrongImageType, setWrongImageType] = useState<WrongImageTypeState>({
    isAvatarError: false,
    isHomeBgError: false
  });
  const [loading, setLoading] = useState<LoadingState>({
    isAvatarLoading: false,
    isHomeBgLoading: false
  });

  const uploadAvatarImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    
    if (selectedFile) {
      setLoading({
        ...loading, 
        isAvatarLoading: true
      })
      const { type, name } = selectedFile;
      if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff'){
        setWrongImageType({...wrongImageType, isAvatarError: false});
  
        client.assets
          .upload('image', selectedFile, { contentType: type, filename: name })
          .then((docuemnt) => {
            setAvatar(docuemnt as SanityImageAssetDocument);
          })
          .catch((error) => {
            console.log('Image upload error: ' + error);
          }).finally(() => setLoading({...loading, isAvatarLoading: false }))
      } else {
        setWrongImageType({...wrongImageType, isAvatarError: true});
        setLoading({...loading, isAvatarLoading: false })
      }
    }
  }

  const uploadHomeBgImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    
    if (selectedFile) {
      setLoading({ ...loading, isHomeBgLoading: true })
      const { type, name } = selectedFile;
      if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff'){
        setWrongImageType({ ...wrongImageType, isHomeBgError: false});
  
        client.assets
          .upload('image', selectedFile, { contentType: type, filename: name })
          .then((docuemnt) => {
            setHomeBg(docuemnt as SanityImageAssetDocument);
          })
          .catch((error) => {
            console.log('Image upload error: ' + error);
          }).finally(() => setLoading({ ...loading, isHomeBgLoading: false }))
      } else {
        setWrongImageType({ ...wrongImageType, isHomeBgError: true});
        setLoading({ ...loading, isHomeBgLoading: false });
      }
    }
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    client.patch(user._id as string)
      .set({
        username: username === '' ? user.username : username,
        image: avatar ? {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: avatar?._id
          }
        } : user.image,
        homeBackground: homeBg ? {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: homeBg?._id
          }
        } : user.homeBackground
      }).commit()
        .then((res) => {
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(res));
          setAvatar(null);
          setUsername('');
          setActiveComponent('main');
        })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-start items-start gap-4"
    >
      <label htmlFor="file" className="self-center cursor-pointer">
        <div className="relative w-32 h-32 rounded-full border-none overflow-hidden">
          {loading.isAvatarLoading ? (
            <div className="w-full h-full rounded-full flex justify-center items-center bg-transparent border border-solid border-[rgba(255,255,255,0.125)]">
              <Loader />
            </div>
          ) : wrongImageType.isAvatarError ? (
            <div className="w-full h-full bg-slate-400 flex justify-center items-center">
              <p className="text-sm font-medium text-red-400">
                Wrong image type
              </p>
            </div>
          ) : avatar ? (
            <img src={urlFor(avatar)} alt="new avatar" />
          ) : (
            <img src={urlFor(user.image)} alt="avatar" />
          )}
          <div className="absolute inset-0 w-full h-full flex justify-center items-center opacity-0 bg-profile_hover hover:opacity-70 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-profile_hover text-white text-2xl font-bold flex justify-center items-center">
              <BiEdit />
            </div>
          </div>
        </div>
        <input
          type="file"
          id="file"
          name="avatar"
          className="hidden"
          onChange={uploadAvatarImage}
        />
      </label>
      <label htmlFor="username" className="w-full flex flex-col gap-2">
        <p className="text-slate-300">
          Username{" "}
          <span className="text-slate-500 text-sm font-normal">{`(${user.username})`}</span>
        </p>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-12 bg-transparent rounded-md indent-2 text-slate-300 border border-solid border-[rgba(255,255,255,0.125)] outline-none"
        />
      </label>
      <label htmlFor="homeBg" className="w-full cursor-pointer flex flex-col gap-2">
        <p className='text-slate-300'>Home background:</p>
        <div className="w-full h-36 bg-transparent rounded-md border border-solid border-[rgba(255,255,255,0.125)] flex justify-center items-center text-4xl text-slate-300">
          <>
            {loading.isHomeBgLoading ? (
              <Loader />
            ) : wrongImageType.isHomeBgError ? (
              <div className='w-full flex flex-col justify-center items-center gap-2'>
                <FcRemoveImage/>
                <p className='text-sm text-red-400'>Wrong image type, the only supported types are: png, svg, jpeg, gif and tiff</p>
              </div>
            ) : homeBg ? (
              <img src={urlFor(homeBg)} alt="home-background preview" className='w-full h-full object-cover'/>
            ) : (
              <BiSolidImageAdd />
            )}
          </>
        </div>
        <input
          type="file"
          id="homeBg"
          name="homeBg"
          className="hidden"
          onChange={uploadHomeBgImage}
        />
      </label>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
        <button
          type="button"
          onClick={() => setActiveComponent("main")}
          className="profile-modal_outline-btn w-full hover:bg-red-500 text-red-700 border-red-500"
        >
          Back
        </button>
        <button
          disabled={avatar || username || homeBg ? false : true}
          type="submit"
          className="profile-modal_outline-btn w-full hover:bg-green-500 text-green-700 border-green-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default EditProfile