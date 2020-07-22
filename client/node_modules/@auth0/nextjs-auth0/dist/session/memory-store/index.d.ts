/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { ISession } from '../session';
import { ISessionStore } from '../store';
export default class MemoryStore implements ISessionStore {
    private session;
    constructor(session?: ISession);
    /**
     * Read the session from the cookie.
     * @param req HTTP request
     * @param res HTTP response
     */
    read(): Promise<ISession | null>;
    /**
     * Write the session to the cookie.
     * @param req HTTP request
     */
    save(_req: IncomingMessage, _res: ServerResponse, session: ISession): Promise<ISession>;
}
