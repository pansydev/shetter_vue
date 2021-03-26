import { tokenManager, TokenManager } from "@shetter/utils/tokenManager";
import { QueryResult, RefreshErrorCode, RefreshResult, RefreshResultType } from "@shetter/models";
import { apolloClient } from "@shetter/utils/client";
import { Router } from "vue-router";
import { router } from "@shetter/utils/router";

import RefreshMutation from "@shetter/graphql/mutations/Refresh.gql";

class RefreshManager {
  constructor(private readonly tokenManager: TokenManager, private readonly router: Router) {}

  private runningRefresh?: Promise<[boolean, RefreshErrorCode?]>;

  ensureRefreshed() {
    if (!this.tokenManager.expired) {
      return Promise.resolve(true);
    }

    return this.refresh();
  }

  refresh() {
    if (this.runningRefresh) {
      return this.runningRefresh;
    }

    this.runningRefresh = this.refreshWorker();

    this.runningRefresh.then(([success, errorCode]) => {
      this.runningRefresh = undefined;

      if (!success) {
        this.tokenManager.clearTokens();
        void this.router.replace({ name: "login", params: { code: errorCode! } });
      }
    });

    return this.runningRefresh;
  }

  private async refreshWorker(): Promise<[boolean, RefreshErrorCode?]> {
    if (!this.tokenManager.authenticated()) {
      return [false, undefined];
    }

    type Result = QueryResult<"refresh", RefreshResult>;

    const { data } = await apolloClient.mutate<Result>({
      mutation: RefreshMutation,
      variables: {
        refreshToken: this.tokenManager.refreshToken,
      },
    });

    if (!data) {
      return [false, undefined];
    }

    if (data.refresh.__typename !== RefreshResultType.RefreshSuccessResult) {
      return [false, data.refresh.code];
    }

    this.tokenManager.setTokens(data.refresh.tokens);
    return [true, undefined];
  }
}

export const refreshManager = new RefreshManager(tokenManager, router);
