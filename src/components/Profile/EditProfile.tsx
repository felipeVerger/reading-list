import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import { Avatar, User } from '../../types/user.type'

import { BiEdit } from 'react-icons/bi';
import { client, urlFor } from '../../client';
import { SanityImageAssetDocument } from '@sanity/client';
import { Loader } from '..';

interface Props {
  user: User;
  setActiveComponent: Dispatch<SetStateAction<'main' | 'edit' | 'books'>>;
}

const EditProfile:FC<Props> = ({ user, setActiveComponent }) => {
  const [avatar, setAvatar] = useState<null | Avatar | SanityImageAssetDocument>(null);
  const [username, setUsername] = useState('');
  const [wrongImageType, setWrongImageType] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    
    if (selectedFile) {
      setLoading(true)
      const { type, name } = selectedFile;
      if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff'){
        setWrongImageType(false);
  
        client.assets
          .upload('image', selectedFile, { contentType: type, filename: name })
          .then((docuemnt) => {
            setAvatar(docuemnt as SanityImageAssetDocument);
          })
          .catch((error) => {
            console.log('Image upload error: ' + error);
          }).finally(() => setLoading(false))
      } else {
        setWrongImageType(true);
        setLoading(false);
      }
    }
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(avatar);
    
    client.patch(user._id as string)
      .set({
        username,
        image: {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: avatar?._id
          }
        }
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
    <form onSubmit={handleSubmit} className="w-full flex flex-col justify-start items-start gap-4">
      <label htmlFor="file" className="self-center cursor-pointer">
        <div className="relative w-32 h-32 rounded-full border-none overflow-hidden">
          {loading ? (
            <div className="w-full h-full rounded-full flex justify-center items-center bg-transparent border border-solid border-[rgba(255,255,255,0.125)]">
              <Loader />
            </div>
          ) : wrongImageType ? (
            <div className="w-full h-full bg-slate-400 flex justify-center items-center">
              <p className="text-lg font-medium text-red-400">
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
          onChange={uploadImage}
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
      <div className='w-full flex flex-col md:flex-row justify-center items-center gap-4'>
        <button type="button" onClick={() => setActiveComponent('main')} className="profile-modal_outline-btn w-full hover:bg-red-500 text-red-700 border-red-500">
          Back
        </button>
        <button disabled={avatar || username ? false : true} type='submit' className="profile-modal_outline-btn w-full hover:bg-green-500 text-green-700 border-green-500 disabled:cursor-not-allowed disabled:opacity-50">
          Save
        </button>
      </div>
    </form>
  );
}

export default EditProfile