import { NextApiRequest, NextApiResponse } from 'next';
import IAuth0Settings from '../settings';
import { IOidcClientFactory } from '../utils/oidc-client';
export interface AuthorizationParameters {
    acr_values?: string;
    audience?: string;
    display?: string;
    login_hint?: string;
    max_age?: string;
    prompt?: string;
    scope?: string;
    state?: string;
    ui_locales?: string;
    [key: string]: unknown;
}
export interface LoginOptions {
    getState?: (req: NextApiRequest) => Record<string, any>;
    authParams?: AuthorizationParameters;
    redirectTo?: string;
}
export default function loginHandler(settings: IAuth0Settings, clientProvider: IOidcClientFactory): (req: NextApiRequest, res: NextApiResponse<any>, options?: LoginOptions | undefined) => Promise<void>;
