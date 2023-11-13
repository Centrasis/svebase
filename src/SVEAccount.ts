export interface BasicUserInitializer {
    name: string;
    id: number;
    requester?: SVEAccount;
}

enum LoginState {
    NotLoggedIn = 1,
    LoggedInByUser,
    LoggedInByToken
};

export interface SessionUserInitializer extends BasicUserInitializer {
    sessionID: string;
    loginState: LoginState;
}

export class SessionUserInitializerType implements SessionUserInitializer {
    public sessionID: string = "";
    public loginState: LoginState = LoginState.NotLoggedIn;
    public name: string = "";
    public id: number = -1;

    constructor(init: SessionUserInitializer) {
        this.id = init.id;
        this.name = init.name;
        this.loginState = init.loginState;
        this.sessionID = init.sessionID;
    }
}

export interface BasicUserLoginInfo {
    name: string,
    pass: string
}

export interface TokenUserLoginInfo {
    user?: number,
    token: string
}


export function isLoginInfo(info: SessionUserInitializer | BasicUserLoginInfo | BasicUserInitializer | TokenUserLoginInfo): boolean {
    return "name" in info && "pass" in info;
}

export function isTokenInfo(info: SessionUserInitializer | BasicUserLoginInfo | BasicUserInitializer | TokenUserLoginInfo): boolean {
    return "name" in info && "token" in info && !isLoginInfo(info);
}

export function isSessionUserInitializer(info: SessionUserInitializer | BasicUserLoginInfo | BasicUserInitializer | TokenUserLoginInfo | string): boolean {
    if(typeof info === "string") {
        return false;
    }
    return "sessionID" in info && "loginState" in info;
}

export function isBasicUserInitializer(info: SessionUserInitializer | BasicUserLoginInfo | BasicUserInitializer | TokenUserLoginInfo): boolean {
    return "id" in info && !isLoginInfo(info) && !isSessionUserInitializer(info);
}


export class SVEAccount {
    protected loginState: LoginState = LoginState.NotLoggedIn;
    protected name: string = "";
    protected id: number = NaN;
    protected sessionID: string = "";
    protected loginInfo: SessionUserInitializer | BasicUserLoginInfo | BasicUserInitializer | TokenUserLoginInfo | string;

    public getID(): number {
        return this.id
    }

    public getName(): string {
        return this.name;
    }

    public setSessionID(id: string) {
        this.sessionID = id;
    }

    public getLoginState(): LoginState {
        return this.loginState;
    }

    public getInitializer(): SessionUserInitializerType {
        return {
            id: this.id,
            loginState: this.loginState,
            name: this.name,
            sessionID: this.sessionID
        };
    }

    public getSessionID(): string {
        return this.sessionID;
    }

    public constructor(loginInfo: SessionUserInitializer | BasicUserLoginInfo | BasicUserInitializer | TokenUserLoginInfo | string) {
        this.loginInfo = loginInfo;
        this.loginState = LoginState.NotLoggedIn;
        if (isSessionUserInitializer(loginInfo)) {
            let init_info =  <SessionUserInitializer>loginInfo; 
            this.id = init_info.id;
            this.name = init_info.name;
            this.loginState = init_info.loginState;
            this.sessionID = init_info.sessionID;
        }
    }

    public init(state: LoginState) {
        if (state !== LoginState.NotLoggedIn) {
            this.loginState = state;
        } else {
            this.name = "";
            this.id = NaN;
            this.loginState = LoginState.NotLoggedIn;
        }
    }

    public getState(): LoginState {
        return this.loginState;
    }
}

export {
    LoginState
}