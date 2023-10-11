import { client } from "../client";
// import { Book } from "../types/books.type";
import { userSavedBooksQuery, userSharedBooksQuery } from "../utils/queries";

export const fetchUserBooks = async (userId: string | undefined, bookType: string) => {
    const sharedQuery = userSharedBooksQuery(userId);
    const savedQuery = userSavedBooksQuery(userId);
    try {
        if (bookType === 'shared') {
            const response = await client.fetch(sharedQuery);
            return response;
        } else {
            const response = await client.fetch(savedQuery);
            return response;
        }
    } catch (error) {
        console.log(error)
    }
}