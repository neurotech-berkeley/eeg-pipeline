export interface ICookieSessionStoreSettings {
    /**
     * Secret used to encrypt the cookie.
     */
    cookieSecret: string;
    /**
     * Name of the cookie in which the session will be stored.
     */
    cookieName?: string;
    /**
     * SameSite support for the session cookie which helps mitigate CSRF attacks.
     * Defaults to "Lax"
     */
    cookieSameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
    /**
     * Cookie lifetime in seconds.
     * After this time has passed, the user will be redirect to Auth0 again.
     * Defaults to 8 hours.
     */
    cookieLifetime?: number;
    /**
     * Path on which to set the cookie.
     * Defaults to /
     */
    cookiePath?: string;
    /**
     * The Domain option to set on the cookie.
     * Defaults to omitting the option, which restricts the cookie
     * to the host of the current document URL, not including subdomains.
     */
    cookieDomain?: string;
    /**
     * Save the id_token in the cookie.
     * Defaults to 'false'
     */
    storeIdToken?: boolean;
    /**
     * Save the access_token in the cookie.
     * Defaults to 'false'
     */
    storeAccessToken?: boolean;
    /**
     * Save the refresh_token in the cookie.
     * Defaults to 'false'
     */
    storeRefreshToken?: boolean;
}
export default class CookieSessionStoreSettings {
    readonly cookieSecret: string;
    readonly cookieName: string;
    readonly cookieLifetime: number;
    readonly cookiePath: string;
    readonly cookieSameSite: boolean | 'lax' | 'strict' | 'none' | undefined;
    readonly cookieDomain: string;
    readonly storeIdToken: boolean;
    readonly storeAccessToken: boolean;
    readonly storeRefreshToken: boolean;
    constructor(settings: ICookieSessionStoreSettings);
}
