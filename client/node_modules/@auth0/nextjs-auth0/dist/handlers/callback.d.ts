import { NextApiRequest, NextApiResponse } from 'next';
import IAuth0Settings from '../settings';
import { ISession } from '../session/session';
import { ISessionStore } from '../session/store';
import { IOidcClientFactory } from '../utils/oidc-client';
export declare type CallbackOptions = {
    redirectTo?: string;
    onUserLoaded?: (req: NextApiRequest, res: NextApiResponse, session: ISession, state: Record<string, any>) => Promise<ISession>;
};
export default function callbackHandler(settings: IAuth0Settings, clientProvider: IOidcClientFactory, sessionStore: ISessionStore): (req: NextApiRequest, res: NextApiResponse<any>, options?: CallbackOptions | undefined) => Promise<void>;
