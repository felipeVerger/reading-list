import { FC } from 'react';
import { Book } from '../../types/books.type';
import Select from 'react-select'

interface Props {
  books: Book[]
}

const Filter:FC<Props> = ({ books }) => {
  const uniqueGenres = new Set<string>();

  books.forEach((book) => {
    uniqueGenres.add(book.genre);
  });

  const genres = [...uniqueGenres].map((genre) => {
    // Convierte el género a formato camel case para "value"
    const value = genre.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
    
    return { value, label: genre };
  });

  console.log(genres);
  

  return (
    <Select
      options={genres}
    />
  )
}

export default Filter