import { NextApiRequest, NextApiResponse } from 'next';
import { ISessionStore } from '../session/store';
import { ITokenCache } from '../tokens/token-cache';
import { IOidcClientFactory } from '../utils/oidc-client';
export default function tokenCacheHandler(clientProvider: IOidcClientFactory, sessionStore: ISessionStore): (req: NextApiRequest, res: NextApiResponse<any>) => ITokenCache;
