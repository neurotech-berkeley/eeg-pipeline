import { Client } from 'openid-client';
import IAuth0Settings from '../settings';
export interface IOidcClientFactory {
    (): Promise<Client>;
}
export default function getClient(settings: IAuth0Settings): IOidcClientFactory;
