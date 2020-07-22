import IAuth0Settings from './settings';
import { ISignInWithAuth0 } from './instance';
export declare function initAuth0(settings: IAuth0Settings): ISignInWithAuth0;
/**
 * @deprecated useAuth0 has been deprecated in favor of initAuth0
 */
export declare const useAuth0: typeof initAuth0;
