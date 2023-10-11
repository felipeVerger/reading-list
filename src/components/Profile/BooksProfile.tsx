import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import IconLibrary from "../../assets/icons";
import BookCard from "../Cards/BookCard";
import { User } from "../../types/user.type";
import { fetchUserBooks } from "../../service/book.service";
import { Book } from "../../types/books.type";
import { Loader } from "..";

interface Props {
  user: User;
  bookType: "shared" | "saved" | "";
  setActiveComponent: Dispatch<SetStateAction<"main" | "edit" | "books">>;
}

const BooksProfile: FC<Props> = ({ bookType, setActiveComponent, user }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchUserBooks(user._id, bookType);
      setBooks(data);
      setLoading(false);
    };

    fetchData();
  }, [bookType, user._id]);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : books?.length === 0 ? (
        <div className="w-full h-screen md:h-full flex flex-col justify-center items-center gap-2">
          <p className="text-lg text-slate-400 font-medium ">
            No books {bookType} yet
          </p>
          <button className="profile-modal_outline-btn hover:bg-green-500 text-green-700 border-green-500">
            Share book
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center gap-4">
            <h4 className="text-white text-2xl font-bold">{bookType}</h4>
            <span className="w-12 h-12 rounded-full bg-transparent border border-solid text-slate-400 text-2xl flex items-center justify-center border-[rgba(255,255,255,0.125)]">
              {books.length}
            </span>
          </div>
          <div className="w-full mt-4 flex justify-center items-center md:justify-start md:items-stretch flex-wrap gap-4">
            {books?.map((book: Book) => (
              <BookCard book={book} key={book._id} />
            ))}
          </div>
        </div>
      )}
      <div
        className="modal-back-btn"
        onClick={() => setActiveComponent("main")}
      >
        <IconLibrary.back />
      </div>
    </>
  );
};

export default BooksProfile;
