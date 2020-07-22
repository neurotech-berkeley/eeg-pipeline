"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const access_token_error_1 = tslib_1.__importDefault(require("./access-token-error"));
const session_1 = tslib_1.__importDefault(require("../utils/session"));
const array_1 = require("../utils/array");
class SessionTokenCache {
    constructor(store, clientProvider, req, res) {
        this.store = store;
        this.clientProvider = clientProvider;
        this.req = req;
        this.res = res;
    }
    getAccessToken(accessTokenRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const session = yield this.store.read(this.req);
            if (!session) {
                throw new access_token_error_1.default('invalid_session', 'The user does not have a valid session.');
            }
            if (!session.accessToken && !session.refreshToken) {
                throw new access_token_error_1.default('invalid_session', 'The user does not have a valid access token.');
            }
            if (!session.accessTokenExpiresAt) {
                throw new access_token_error_1.default('access_token_expired', 'Expiration information for the access token is not available. The user will need to sign in again.');
            }
            if (accessTokenRequest && accessTokenRequest.scopes) {
                const persistedScopes = session.accessTokenScope;
                if (!persistedScopes || persistedScopes.length === 0) {
                    throw new access_token_error_1.default('insufficient_scope', 'An access token with the requested scopes could not be provided. The user will need to sign in again.');
                }
                const matchingScopes = array_1.intersect(accessTokenRequest.scopes, persistedScopes.split(' '));
                if (!array_1.match(accessTokenRequest.scopes, [...matchingScopes])) {
                    throw new access_token_error_1.default('insufficient_scope', `Could not retrieve an access token with scopes "${accessTokenRequest.scopes.join(' ')}". The user will need to sign in again.`);
                }
            }
            // Check if the token has expired.
            // There is an edge case where we might have some clock skew where our code assumes the token is still valid.
            // Adding a skew of 1 minute to compensate.
            if (!session.refreshToken && session.accessTokenExpiresAt * 1000 - 60000 < Date.now()) {
                throw new access_token_error_1.default('access_token_expired', 'The access token expired and a refresh token is not available. The user will need to sign in again.');
            }
            // Check if the token has expired.
            // There is an edge case where we might have some clock skew where our code assumes the token is still valid.
            // Adding a skew of 1 minute to compensate.
            if (session.refreshToken && session.accessTokenExpiresAt * 1000 - 60000 < Date.now()) {
                const client = yield this.clientProvider();
                const tokenSet = yield client.refresh(session.refreshToken);
                // Update the session.
                const newSession = session_1.default(tokenSet);
                yield this.store.save(this.req, this.res, Object.assign(Object.assign({}, newSession), { refreshToken: newSession.refreshToken || session.refreshToken }));
                // Return the new access token.
                return {
                    accessToken: tokenSet.access_token
                };
            }
            // We don't have an access token.
            if (!session.accessToken) {
                throw new access_token_error_1.default('invalid_session', 'The user does not have a valid access token.');
            }
            // The access token is not expired and has sufficient scopes;
            return {
                accessToken: session.accessToken
            };
        });
    }
}
exports.default = SessionTokenCache;
//# sourceMappingURL=session-token-cache.js.map