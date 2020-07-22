export default class AccessTokenError extends Error {
    code: string;
    constructor(code: string, message: string);
}
