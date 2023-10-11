import { FC, Dispatch, SetStateAction } from "react";
import { User } from "../../types/user.type";
import { urlFor } from "../../client";
import { useNavigate } from "react-router-dom";
import IconLibrary from "../../assets/icons";

interface Props {
  user: User;
  setActiveComponent: Dispatch<SetStateAction<"main" | "edit" | "books">>;
  setBookType: Dispatch<SetStateAction<"shared" | "saved" | "">>;
}

const MainView: FC<Props> = ({ user, setActiveComponent, setBookType }) => {
  const navigate = useNavigate();

  const handleBookType = (bookType: "shared" | "saved" | "") => {
    setActiveComponent("books");
    setBookType(bookType);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <>
      <div className="w-full flex justify-start items-center gap-4">
        <button className="w-32 h-32 rounded-full border-none overflow-hidden cursor-default">
          <img
            src={urlFor(user.image)}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </button>
        <div className="flex flex-col gap-2">
          <h2 className="text-white text-2xl font-semibold">{user.username}</h2>
          <p className="text-slate-400 text-sm font-medium">{user.email}</p>
        </div>
      </div>
      <div className="w-full mt-4 flex flex-col gap-2">
        <h4 className="text-slate-400 text-sm font-medium">Book management:</h4>
        <div className="w-full flex justify-around items-center gap-4">
          <button
            onClick={() => handleBookType("shared")}
            className="profile-modal_btn"
          >
            Created
            <span className="w-7 h-7 bg-modalBackground rounded-full text-white flex justify-center items-center">
              <IconLibrary.shared/>
            </span>
          </button>
          <button
            onClick={() => handleBookType("saved")}
            className="profile-modal_btn"
          >
            Saved
            <span className="w-7 h-7 bg-modalBackground rounded-full text-white flex justify-center items-center">
              <IconLibrary.saved/>
            </span>
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col md:flex-row w-full gap-4">
        <button
          onClick={() => setActiveComponent("edit")}
          className="profile-modal_outline-btn hover:bg-green-500 text-green-700 border-green-500"
        >
          <IconLibrary.edit />
          Edit profile
        </button>
        <button
          onClick={handleLogout}
          className="profile-modal_outline-btn hover:bg-red-500 text-red-700 border-red-500"
        >
          <IconLibrary.logout />
          Logout
        </button>
      </div>
    </>
  );
};

export default MainView;
