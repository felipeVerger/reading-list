import { createSlice } from '@reduxjs/toolkit';
import { Book } from '../../types/books.type';

interface InitialStateI {
    books: Book[];
    readingList: Book[];
    filter: string;
}

const initialState: InitialStateI = {
    books: [],
    readingList: [],
    filter: "",
}

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks: (state, action) => {
          state.books = action.payload;
        }
    }
})

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;