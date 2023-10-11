import { useState } from "react";
import { fetchUser } from "../../utils/fetchUser";
import { Modal, BooksProfile, EditProfile, MainProfile } from "..";
import useProfileModal from "../../hooks/useProfileModal"

const ProfileModal = () => {
  const [activeComponent, setActiveComponent] = useState<'main' | 'edit' | 'books'>('main');
  const [bookType, setBookType] = useState<'shared' | 'saved' | ''>('');
  const { onClose, isOpen } = useProfileModal();
  const user = fetchUser();

  const onChange = (open: boolean) => {
    if (!open) {
        onClose();
        setActiveComponent('main');
    }
  }

  return (
    <Modal isOpen={isOpen} onChange={onChange}>
      {activeComponent === 'main' && <MainProfile user={user} setActiveComponent={setActiveComponent} setBookType={setBookType}/>}
      {activeComponent === 'edit' && <EditProfile user={user} setActiveComponent={setActiveComponent}/>}
      {activeComponent === 'books' && <BooksProfile bookType={bookType} setActiveComponent={setActiveComponent} user={user}/>}
    </Modal>
  );
}

export default ProfileModal