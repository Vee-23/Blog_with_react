import config from '../config/config';
import {Client, Acount, ID, Account} from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call another method
                return this.login({email, password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw console.log("Appwrite service :: createAccount - Error", error);;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw console.log("Appwrite service :: Login - Error", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw console.log("Appwrite service :: getCurrentUser - Error", error);
        }

        return null;
    }

    async logOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw console.log("Appwrite service :: logOut - Error", error);
        }
    }
}

const authService = new AuthService();
export default authService;