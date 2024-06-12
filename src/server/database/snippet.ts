import type { Models } from "appwrite";
import { Collection } from "appwrite-ooc";
import { databases } from "../appwrite";
export type PureData<T> = Omit<
    T,
    | "$id"
    | "$collectionId"
    | "$databaseId"
    | "$createdAt"
    | "$updatedAt"
    | "$permissions"
>;

export interface Snippet extends Models.Document {
    title: string;
    description: string;
    code: string;
    language: string;
    isPublic: boolean;
    tag: string[];
}
export const snippets = new Collection<Snippet>(databases, "code", "snippets");
