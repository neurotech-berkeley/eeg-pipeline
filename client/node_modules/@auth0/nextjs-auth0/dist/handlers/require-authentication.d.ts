import { NextApiResponse, NextApiRequest } from 'next';
import { ISessionStore } from '../session/store';
export interface IApiRoute {
    (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}
export default function requireAuthentication(sessionStore: ISessionStore): (apiRoute: IApiRoute) => IApiRoute;
