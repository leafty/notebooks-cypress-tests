export declare const registerCustomCommands: () => void;
declare global {
    namespace Cypress {
        interface Chainable {
            renkuLoginIfRequired(username: string, password: string): Chainable<any>;
        }
    }
}
