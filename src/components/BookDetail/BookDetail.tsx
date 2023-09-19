import { FC, Dispatch, SetStateAction } from 'react'
import { useAppSelector } from '../../hooks/storeHooks';
import { AiOutlineClose } from 'react-icons/ai';
import './BookDetail.css';


interface BookDetailProps {
  selectedBook: number | null;
  setOpen: Dispatch<SetStateAction<boolean>>
}

const BookDetail: FC<BookDetailProps> = ({ selectedBook, setOpen }) => {
  const { books } = useAppSelector(state => state.books)
  
  const bookDetail = books.filter((book) => {
    // save only the book that matches with the selectedBook
    return (selectedBook === undefined || parseInt(String(book.id)) == Number(selectedBook));
  })
  
  return (
    <div className='book-detail_container'>
      <div className='book-detail_block'>
        {bookDetail.map((book) => (
          <div className='book-detail'>
            <img src={book.cover} alt="cover" />
            <div className='book-content'>
              <div className='text-content'>
                <h2>{book.title}</h2>
                <p>Genre: <span>{book.genre}</span></p>
                <p>Synopsis: <span>{book.synopsis}</span></p>
                <p>Pages: <span>{book.pages}</span></p>
                <p>Author: <span>{book.author.name}</span></p>
                <p>Year: <span>{book.year}</span></p>
              </div>
              <button>+</button>
            </div>
            <div className='close_icon'>
              <AiOutlineClose onClick={() => setOpen(false)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookDetail