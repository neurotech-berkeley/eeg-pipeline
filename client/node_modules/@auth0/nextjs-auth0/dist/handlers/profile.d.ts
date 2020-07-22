import { NextApiResponse, NextApiRequest } from 'next';
import { ISessionStore } from '../session/store';
import { IOidcClientFactory } from '../utils/oidc-client';
export declare type ProfileOptions = {
    refetch?: boolean;
};
export default function profileHandler(sessionStore: ISessionStore, clientProvider: IOidcClientFactory): (req: NextApiRequest, res: NextApiResponse<any>, options?: ProfileOptions | undefined) => Promise<void>;
