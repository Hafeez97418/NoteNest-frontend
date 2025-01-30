export type Notes = {
  _id: string;
  title: string;
  body: string;
  tag: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  createdAt: string;
  email: string;
}

export interface Theme {
  name: string;
  color: string;
  _id: string;
}
