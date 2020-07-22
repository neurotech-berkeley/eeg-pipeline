"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base64url_1 = tslib_1.__importDefault(require("base64url"));
const crypto_1 = require("crypto");
/**
 * Create a state which can include custom data.
 * @param payload
 */
function createState(payload) {
    const stateObject = payload || {};
    stateObject.nonce = createNonce();
    return encodeState(stateObject);
}
exports.createState = createState;
/**
 * Generates a nonce value.
 */
function createNonce() {
    return crypto_1.randomBytes(16).toString('hex');
}
/**
 * Prepare a state object to send.
 */
function encodeState(stateObject) {
    return base64url_1.default.encode(JSON.stringify(stateObject));
}
/**
 * Decode a state value. */
function decodeState(stateValue) {
    const decoded = base64url_1.default.decode(stateValue);
    // Backwards compatibility
    if (decoded.indexOf('{') !== 0) {
        return { nonce: stateValue };
    }
    return JSON.parse(base64url_1.default.decode(stateValue));
}
exports.decodeState = decodeState;
//# sourceMappingURL=state.js.map