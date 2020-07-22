"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const session_token_cache_1 = tslib_1.__importDefault(require("../tokens/session-token-cache"));
function tokenCacheHandler(clientProvider, sessionStore) {
    return (req, res) => {
        if (!req) {
            throw new Error('Request is not available');
        }
        if (!res) {
            throw new Error('Response is not available');
        }
        return new session_token_cache_1.default(sessionStore, clientProvider, req, res);
    };
}
exports.default = tokenCacheHandler;
//# sourceMappingURL=token-cache.js.map