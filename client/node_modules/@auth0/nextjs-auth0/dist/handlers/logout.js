"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookies_1 = require("../utils/cookies");
function createLogoutUrl(settings, returnToUrl) {
    return `https://${settings.domain}/v2/logout?client_id=${settings.clientId}&returnTo=${encodeURIComponent(returnToUrl)}`;
}
function logoutHandler(settings, sessionSettings, clientProvider, store) {
    return (req, res, options) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!req) {
            throw new Error('Request is not available');
        }
        if (!res) {
            throw new Error('Response is not available');
        }
        const session = yield store.read(req);
        let endSessionUrl;
        const returnToUrl = (options === null || options === void 0 ? void 0 : options.returnTo) || settings.postLogoutRedirectUri;
        try {
            const client = yield clientProvider();
            endSessionUrl = client.endSessionUrl({
                id_token_hint: session ? session.idToken : undefined,
                post_logout_redirect_uri: returnToUrl
            });
        }
        catch (err) {
            if (/end_session_endpoint must be configured/.exec(err)) {
                // Use default url if end_session_endpoint is not configured
                endSessionUrl = createLogoutUrl(settings, returnToUrl);
            }
            else {
                throw err;
            }
        }
        // Remove the cookies
        cookies_1.setCookies(req, res, [
            {
                name: 'a0:state',
                value: '',
                maxAge: -1
            },
            {
                name: sessionSettings.cookieName,
                value: '',
                maxAge: -1,
                path: sessionSettings.cookiePath,
                domain: sessionSettings.cookieDomain
            }
        ]);
        // Redirect to the logout endpoint.
        res.writeHead(302, {
            Location: endSessionUrl
        });
        res.end();
    });
}
exports.default = logoutHandler;
//# sourceMappingURL=logout.js.map