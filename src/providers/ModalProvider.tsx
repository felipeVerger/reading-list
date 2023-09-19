import { useEffect, useState } from 'react'

import ProfileModal from '../components/Modal/ProfileModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
        <ProfileModal/>
    </>
  )
}

export default ModalProvider