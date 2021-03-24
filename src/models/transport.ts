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

export type QueryResult<TField extends string, TResult> = {
  // eslint-disable-next-line no-unused-vars
  [_ in TField]: TResult;
};

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
