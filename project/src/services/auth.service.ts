import type { Account, User } from "../components/login/dataLogin/interfaces";

export const AuthService = {
    login(user: User, account: Account){
        const sessionData = {...user, role: account.role};
        localStorage.setItem("session", JSON.stringify(sessionData));
    },

    logout(){
        localStorage.removeItem("session");
    },

    getSession(){
      return JSON.parse(localStorage.getItem("session") || "null");  
    },

    isAuthenticated(){
        return !!localStorage.getItem("session");
    },

    getRole(){
        const session = this.getSession();
        return session ? session.role : null;
    }
}
