export type UserModel = {
  id: string;
  name?: string;
  age?: number;
};

export type BookModel = {
  id: string;
  name?: string;
  genre?: string;
  userId: string;
};
