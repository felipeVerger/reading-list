export interface Books {
    books: Book[];
}

export interface Book {
    id: number;
    title:    string;
    pages:    number;
    genre:    string;
    cover:    string;
    synopsis: string;
    year:     number;
    ISBN:     string;
    author:   Author;
}

export interface Author {
    name:       string;
    otherBooks: string[];
}