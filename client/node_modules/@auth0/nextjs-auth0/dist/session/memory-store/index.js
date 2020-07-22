"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class MemoryStore {
    constructor(session) {
        if (session === undefined) {
            this.session = null;
        }
        else {
            this.session = session;
        }
    }
    /**
     * Read the session from the cookie.
     * @param req HTTP request
     * @param res HTTP response
     */
    read() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.session;
        });
    }
    /**
     * Write the session to the cookie.
     * @param req HTTP request
     */
    save(_req, _res, session) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.session = session;
            return session;
        });
    }
}
exports.default = MemoryStore;
//# sourceMappingURL=index.js.map