export interface Books {
    books: Book[];
}

export interface Book {
    _id: number;
    title:    string;
    pages:    number;
    genre:    string;
    cover:    string;
    synopsis: string;
    year:     number;
    author:   string;
}

export interface Author {
    name:       string;
    otherBooks: string[];
}