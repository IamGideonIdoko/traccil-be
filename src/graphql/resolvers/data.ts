import { Book, User } from '../generated-types';
// dummy data
export const books = [
  { name: 'Name of the wind', genre: 'Fantasy', id: '1', userId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', userId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', userId: '3' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', userId: '2' },
  { name: 'The colour of Magic', genre: 'Sci-Fi', id: '5', userId: '1' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', userId: '2' },
];

export const users = [
  { name: 'Patrick Rothfus', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
];

export const getBookById = (id: string) => {
  console.log(`Called getBookById for id: ${id}`);
  return books.find((item) => item.id === id) as Book;
};

export const getBooks = () => books as Book[];

export const getBooksByUserId = (id: string) => {
  console.log(`Called getBooksByUserId for id: ${id}`);
  return books.filter((item) => item.userId === id) as Book[];
};

export const getUserById = (id: string) => {
  console.log(`Called getUserById for id: ${id}`);
  return users.find((item) => item.id === id) as User;
};

export const getUsers = () => users as User[];
