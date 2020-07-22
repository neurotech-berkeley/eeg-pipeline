"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper which tests if a URL can safely be redirected to. Requires the URL to be relative.
 * @param url
 */
function isSafeRedirect(url) {
    if (typeof url !== 'string') {
        throw new TypeError(`Invalid url: ${url}`);
    }
    // Prevent open redirects using the //foo.com format (double forward slash).
    if (/\/\//.test(url)) {
        return false;
    }
    return !/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
}
exports.default = isSafeRedirect;
//# sourceMappingURL=url-helpers.js.map