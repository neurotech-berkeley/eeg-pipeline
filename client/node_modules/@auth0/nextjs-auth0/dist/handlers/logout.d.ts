import { NextApiRequest, NextApiResponse } from 'next';
import IAuth0Settings from '../settings';
import { IOidcClientFactory } from '../utils/oidc-client';
import CookieSessionStoreSettings from '../session/cookie-store/settings';
import { ISessionStore } from '../session/store';
export interface LogoutOptions {
    returnTo?: string;
}
export default function logoutHandler(settings: IAuth0Settings, sessionSettings: CookieSessionStoreSettings, clientProvider: IOidcClientFactory, store: ISessionStore): (req: NextApiRequest, res: NextApiResponse<any>, options?: LogoutOptions | undefined) => Promise<void>;
