import { FC, useEffect, Dispatch, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import jsonBooks from '../../constants/books.json';
import { setBooks } from '../../redux/slices/booksSlice';
import { Filter, Divider, BookCard } from '..';
import './BooksList.css';

interface Props {
  setSelectedBook: Dispatch<SetStateAction<number | null>>
  setOpen: Dispatch<SetStateAction<boolean>>
}

const BooksList:FC<Props> = ({ setSelectedBook, setOpen }) => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector(state => state.books)

  useEffect(() => {
    const fetchedBooks = jsonBooks;
    dispatch(setBooks(fetchedBooks));
  }, [dispatch]);

  return (
    <section className='book-list_container card-bg'>
      <header>
        <h2>Books to read: <span>12</span></h2>
        <Filter books={books}/>
      </header>
      <Divider/>
      <article className='books_container'>
        {books.map((book) => (
          <BookCard
            key={book.title}
            book={book}
            onClick={setSelectedBook}
            setOpen={setOpen}
          />
        ))}
      </article>
      <Divider/>
      <footer>
        hola
      </footer>
    </section>
  )
}

export default BooksList