"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const version_1 = tslib_1.__importDefault(require("../version"));
const url_helpers_1 = tslib_1.__importDefault(require("../utils/url-helpers"));
const cookies_1 = require("../utils/cookies");
const state_1 = require("../utils/state");
function telemetry() {
    const bytes = Buffer.from(JSON.stringify({
        name: 'nextjs-auth0',
        version: version_1.default
    }));
    return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function loginHandler(settings, clientProvider) {
    return (req, res, options) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!req) {
            throw new Error('Request is not available');
        }
        if (!res) {
            throw new Error('Response is not available');
        }
        if (req.query.redirectTo) {
            if (typeof req.query.redirectTo !== 'string') {
                throw new Error('Invalid value provided for redirectTo, must be a string');
            }
            if (!url_helpers_1.default(req.query.redirectTo)) {
                throw new Error('Invalid value provided for redirectTo, must be a relative url');
            }
        }
        const opt = options || {};
        const getLoginState = opt.getState ||
            function getLoginState() {
                return {};
            };
        const _b = (opt && opt.authParams) || {}, { 
        // Generate a state which contains a nonce, the redirectTo uri and potentially custom data
        state = state_1.createState(Object.assign({ redirectTo: ((_a = req.query) === null || _a === void 0 ? void 0 : _a.redirectTo) || (options === null || options === void 0 ? void 0 : options.redirectTo) }, getLoginState(req))) } = _b, authParams = tslib_1.__rest(_b, ["state"]);
        // Create the authorization url.
        const client = yield clientProvider();
        const authorizationUrl = client.authorizationUrl(Object.assign({ redirect_uri: settings.redirectUri, scope: settings.scope, response_type: 'code', audience: settings.audience, state, auth0Client: telemetry() }, authParams));
        // Set the necessary cookies
        cookies_1.setCookies(req, res, [
            {
                name: 'a0:state',
                value: state,
                maxAge: 60 * 60
            }
        ]);
        // Redirect to the authorize endpoint.
        res.writeHead(302, {
            Location: authorizationUrl
        });
        res.end();
    });
}
exports.default = loginHandler;
//# sourceMappingURL=login.js.map