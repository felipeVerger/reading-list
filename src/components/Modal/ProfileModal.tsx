import useProfileModal from "../../hooks/useProfileModal"
import Modal from "./Modal"


const ProfileModal = () => {
  const { onClose, isOpen } = useProfileModal();

  const onChange = (open: boolean) => {
    if (!open) {
        onClose()
    }
  }

  return (
    <Modal
        title="Profile"
        description="Your personalized space to manage your account, update information, and tailor your experience. Edit your details, preferences, and more in one central hub."
        isOpen={isOpen}
        onChange={onChange}
    >
        Profile modal children
    </Modal>
  )
}

export default ProfileModal