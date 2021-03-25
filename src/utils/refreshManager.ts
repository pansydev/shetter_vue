import { tokenManager, TokenManager } from "@shetter/utils/tokenManager";
import { QueryResult, RefreshResult, RefreshResultType } from "@shetter/models";
import { apolloClient } from "@shetter/utils/client";
import { Router } from "vue-router";
import { router } from "@shetter/utils/router";

import RefreshMutation from "@shetter/queries/Refresh.gql";

class RefreshManager {
  constructor(private readonly tokenManager: TokenManager, private readonly router: Router) {}

  private runningRefresh?: Promise<boolean>;

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

    this.runningRefresh.then(success => {
      this.runningRefresh = undefined;

      if (!success) {
        void this.router.replace({ name: "login" });
      }
    });

    return this.runningRefresh;
  }

  private async refreshWorker(): Promise<boolean> {
    if (!this.tokenManager.authenticated()) {
      return false;
    }

    type Result = QueryResult<"refresh", RefreshResult>;

    const { data } = await apolloClient.mutate<Result>({
      mutation: RefreshMutation,
      variables: {
        refreshToken: this.tokenManager.refreshToken,
      },
    });

    if (!data) {
      return false;
    }

    if (data.refresh.__typename !== RefreshResultType.RefreshSuccessResult) {
      return false;
    }

    this.tokenManager.setTokens(data.refresh.tokens);
    return true;
  }
}

export const refreshManager = new RefreshManager(tokenManager, router);
