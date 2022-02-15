export interface User {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  password: string,
  country: string,
  city: string
}

export interface LoggingUser {
  username: string,
  password: string
}

export interface NewUser {
  username: string,
  firstName: string,
  lastName: string,
  password: string,
  country: string,
  city: string
}