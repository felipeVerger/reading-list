import { FC } from 'react'
import { Book } from '../../types/books.type'
import { urlFor } from '../../client'

interface BookCardProps {
  book: Book
}

const BookCard: FC<BookCardProps> = ({ book }) => {
    
  return (
    <div className='h-54 w-44 rounded-md relative cursor-pointer group z-0'>
        <img src={urlFor(book.cover)} alt="book cover" className='w-full h-full object-cover rounded-md'/>
        <div className='absolute inset-0 w-full h-full bg-blackHoverCard rounded-md opacity-0 group-hover:opacity-100 transition ease-in-out delay-70'>
          <h4 className='absolute p-2 bottom-2 left-2 text-white font-medium group-hover:animate-fade-up'>{book.title}</h4>
        </div>
    </div>
  )
}

export default BookCard