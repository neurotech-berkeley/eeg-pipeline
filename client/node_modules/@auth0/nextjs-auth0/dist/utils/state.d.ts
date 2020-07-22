/**
 * Create a state which can include custom data.
 * @param payload
 */
export declare function createState(payload?: Record<string, any>): string;
/**
 * Decode a state value. */
export declare function decodeState(stateValue: string): Record<string, any>;
