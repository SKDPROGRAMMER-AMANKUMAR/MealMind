import { Client, Account,Databases,Storage} from 'appwrite';
import conf from './Conf';

export const client = new Client();

client
    .setEndpoint(conf.appwriteEndPOINT)  // Your Appwrite endpoint
    .setProject(conf.appwriteProjectID) // Replace with your project ID
    // .setKey(conf.appwriteApiKeySecretID); // Replace with your API key

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export { ID } from 'appwrite';