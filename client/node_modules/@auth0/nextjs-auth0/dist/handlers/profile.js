"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const token_cache_1 = tslib_1.__importDefault(require("./token-cache"));
function profileHandler(sessionStore, clientProvider) {
    return (req, res, options) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!req) {
            throw new Error('Request is not available');
        }
        if (!res) {
            throw new Error('Response is not available');
        }
        const session = yield sessionStore.read(req);
        if (!session || !session.user) {
            res.status(401).json({
                error: 'not_authenticated',
                description: 'The user does not have an active session or is not authenticated'
            });
            return;
        }
        if (options && options.refetch) {
            const tokenCache = token_cache_1.default(clientProvider, sessionStore)(req, res);
            const { accessToken } = yield tokenCache.getAccessToken();
            if (!accessToken) {
                throw new Error('No access token available to refetch the profile');
            }
            const client = yield clientProvider();
            const userInfo = yield client.userinfo(accessToken);
            const updatedUser = Object.assign(Object.assign({}, session.user), userInfo);
            yield sessionStore.save(req, res, Object.assign(Object.assign({}, session), { user: updatedUser }));
            res.json(updatedUser);
            return;
        }
        res.json(session.user);
    });
}
exports.default = profileHandler;
//# sourceMappingURL=profile.js.map