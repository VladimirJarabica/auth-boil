import { verify } from "jsonwebtoken";
import { options } from "../container";
import { createAccessToken, createRefreshToken } from "../utils/tokens";

type Reason =
  | "token_not_provided"
  | "token_invalid"
  | "user_not_found"
  | "token_version_invalid";

type RefreshTokenResponse =
  | {
      ok: true;
      refreshToken: string;
      accessToken: string;
    }
  | { ok: false; reason: Reason };

export const refreshAccessToken = async (
  refreshToken?: string
): Promise<RefreshTokenResponse> => {
  if (!refreshToken) {
    return { ok: false, reason: "token_not_provided" };
  }
  const { userId, tokenVersion } = verify(
    refreshToken,
    options.refreshTokenSecret
  ) as any;

  if (!userId) {
    return { ok: false, reason: "token_invalid" };
  }

  const user = await options.getUserById(userId);

  if (!user) {
    return { ok: false, reason: "user_not_found" };
  }

  if (user.tokenVersion !== tokenVersion) {
    return { ok: false, reason: "token_version_invalid" };
  }

  return {
    ok: true,
    accessToken: createAccessToken(user),
    refreshToken: createRefreshToken(user)
  };
};
