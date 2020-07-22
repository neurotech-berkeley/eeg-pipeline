/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { ISessionStore } from '../session/store';
import { IOidcClientFactory } from '../utils/oidc-client';
import { ITokenCache, AccessTokenRequest, AccessTokenResponse } from './token-cache';
export default class SessionTokenCache implements ITokenCache {
    private store;
    private clientProvider;
    private req;
    private res;
    constructor(store: ISessionStore, clientProvider: IOidcClientFactory, req: IncomingMessage, res: ServerResponse);
    getAccessToken(accessTokenRequest?: AccessTokenRequest): Promise<AccessTokenResponse>;
}
