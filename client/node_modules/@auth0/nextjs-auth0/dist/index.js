"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initAuth0(settings) {
    const isBrowser = typeof window !== 'undefined' || process.browser;
    if (isBrowser) {
        return require('./instance.browser').default(settings);
    }
    return require('./instance.node').default(settings);
}
exports.initAuth0 = initAuth0;
/**
 * @deprecated useAuth0 has been deprecated in favor of initAuth0
 */
exports.useAuth0 = initAuth0;
//# sourceMappingURL=index.js.map