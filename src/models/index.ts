export interface Entity {
  readonly id: number;
}

export interface User extends Entity {
  readonly username: string;
}

export interface Post extends Entity {
  readonly text: string;
  readonly author: User;
  readonly createdAt: number;
}
