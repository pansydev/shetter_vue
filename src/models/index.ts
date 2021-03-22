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

export interface PageInfo {
  readonly endCursor: string;
  readonly startCursor: string;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export interface Connection<T> {
  readonly totalCount: number;
  readonly nodes: readonly T[];
  readonly pageInfo: PageInfo;
}
