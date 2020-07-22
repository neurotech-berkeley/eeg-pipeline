"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessTokenError extends Error {
    constructor(code, message) {
        super(message);
        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        // Machine readable code.
        this.code = code;
    }
}
exports.default = AccessTokenError;
//# sourceMappingURL=access-token-error.js.map