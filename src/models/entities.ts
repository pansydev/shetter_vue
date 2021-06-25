export interface Entity {
  readonly id: number;
}

export interface User extends Entity {
  readonly username: string;
  readonly isBot: boolean;
}

export interface Post extends Entity {
  readonly text: string;
  readonly author?: User;
  readonly creationTime: number;
}
