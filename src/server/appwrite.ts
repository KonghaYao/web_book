import { Message } from "@cn-ui/core";
import { Client, Databases } from "appwrite";
import { CurrentUser } from "appwrite-ooc";

const client = new Client()
    .setEndpoint("https://appwrite.deno.dev/v1")
    .setProject("snapshots");
export default client;

export const databases = new Databases(client);

export const user = new CurrentUser(client);

export const AppWriteErrorHandler = (error: any) => {
    if (error.code !== 0) {
        Message.error(error.message);
    }
};
