import { Client, Databases } from "appwrite";
import { CurrentUser } from "appwrite-ooc";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("snapshots");
export default client;

export const databases = new Databases(client);

export const user = new CurrentUser(client);
