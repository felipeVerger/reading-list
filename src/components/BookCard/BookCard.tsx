import { FC, Dispatch, SetStateAction } from 'react';
import './BookCard.css';
import { Book } from '../../types/books.type';

interface Props {
  book: Book;
  onClick: Dispatch<SetStateAction<number | null>>
  setOpen: Dispatch<SetStateAction<boolean>>
}

const BookCard:FC<Props> = ({ book: { cover, id }, onClick, setOpen }) => {
  return (
    <div
      className="book-card_container"
      onClick={() => {
        onClick(id);
        setOpen(true);
      }}
    >
      <img src={cover} alt="book cover" />
    </div>
  );
}

export default BookCard