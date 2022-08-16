import { BookModel, UserModel } from '../models';
// dummy data
export const books: Array<BookModel> = [
  { name: 'Name of the wind', genre: 'Fantasy', id: '1', userId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', userId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', userId: '3' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', userId: '2' },
  { name: 'The colour of Magic', genre: 'Sci-Fi', id: '5', userId: '1' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', userId: '2' },
];

export const users: Array<UserModel> = [
  { name: 'Patrick Rothfus', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
];

export const getBookById = (id: string) => {
  console.log(`Called getBookById for id: ${id}`);
  return books.find((item) => item.id === id) as BookModel;
};

export const getBooks = () => books as BookModel[];

export const getBooksByUserId = (id: string) => {
  console.log(`Called getBooksByUserId for id: ${id}`);
  return books.filter((item) => item.userId === id) as BookModel[];
};

export const getUserById = (id: string) => {
  console.log(`Called getUserById for id: ${id}`);
  return users.find((item) => item.id === id) as UserModel;
};

export const getUsers = () => users as UserModel[];

/**
 * Batch function to get books
 */
export const getBookByIds = (ids: string[]) => {
  return ids.map((id) => getBookById(id)) as BookModel[];
};
/**
 * Batch function to get users
 */
export const getUserByIds = (ids: string[]) => {
  return ids.map((id) => getUserById(id)) as UserModel[];
};

export const getBooksByUserIds = (ids: string[]) => {
  return ids.map((id) => getBooksByUserId(id)) as BookModel[][];
};
