"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSessionFromTokenSet(tokenSet) {
    // Get the claims without any OIDC specific claim.
    const claims = tokenSet.claims();
    if (claims.aud) {
        delete claims.aud;
    }
    if (claims.exp) {
        delete claims.exp;
    }
    if (claims.iat) {
        delete claims.iat;
    }
    if (claims.iss) {
        delete claims.iss;
    }
    // Create the session.
    return {
        user: Object.assign({}, claims),
        idToken: tokenSet.id_token,
        accessToken: tokenSet.access_token,
        accessTokenScope: tokenSet.scope,
        accessTokenExpiresAt: tokenSet.expires_at,
        refreshToken: tokenSet.refresh_token,
        createdAt: Date.now()
    };
}
exports.default = getSessionFromTokenSet;
//# sourceMappingURL=session.js.map