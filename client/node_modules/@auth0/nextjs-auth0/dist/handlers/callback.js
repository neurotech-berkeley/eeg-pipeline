"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const state_1 = require("../utils/state");
const cookies_1 = require("../utils/cookies");
const session_1 = tslib_1.__importDefault(require("../utils/session"));
function callbackHandler(settings, clientProvider, sessionStore) {
    return (req, res, options) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!res) {
            throw new Error('Response is not available');
        }
        if (!req) {
            throw new Error('Request is not available');
        }
        // Parse the cookies.
        const cookies = cookies_1.parseCookies(req);
        // Require that we have a state.
        const state = cookies['a0:state'];
        if (!state) {
            throw new Error('Invalid request, an initial state could not be found');
        }
        // Execute the code exchange
        const client = yield clientProvider();
        const params = client.callbackParams(req);
        const tokenSet = yield client.callback(settings.redirectUri, params, {
            state
        });
        const decodedState = state_1.decodeState(state);
        // Get the claims without any OIDC specific claim.
        let session = session_1.default(tokenSet);
        // Run the identity validated hook.
        if (options && options.onUserLoaded) {
            session = yield options.onUserLoaded(req, res, session, decodedState);
        }
        // Create the session.
        yield sessionStore.save(req, res, session);
        // Redirect to the homepage or custom url.
        const redirectTo = (options && options.redirectTo) || decodedState.redirectTo || '/';
        res.writeHead(302, {
            Location: redirectTo
        });
        res.end();
    });
}
exports.default = callbackHandler;
//# sourceMappingURL=callback.js.map