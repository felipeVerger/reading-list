import { IconType } from 'react-icons';
import { AiOutlineRollback } from 'react-icons/ai';
import { BiLogOut, BiEdit, BiSolidImageAdd, BiCheckCircle } from 'react-icons/bi';
import { FcRemoveImage } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { BsFillBookmarkFill, BsFillFilePlusFill } from 'react-icons/bs';

export interface IconLibrary {
    back: IconType,
    logout: IconType,
    edit: IconType,
    addImage: IconType,
    checkCircle: IconType,
    errorImage: IconType,
    close: IconType,
    delete: IconType,
    saved: IconType,
    shared: IconType
  }

const IconLibrary:IconLibrary = {
    back: AiOutlineRollback,
    logout: BiLogOut,
    edit: BiEdit,
    addImage: BiSolidImageAdd,
    checkCircle: BiCheckCircle,
    errorImage: FcRemoveImage,
    close: IoMdClose,
    delete: MdDelete,
    saved: BsFillBookmarkFill,
    shared: BsFillFilePlusFill
}

export default IconLibrary