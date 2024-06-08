import type { Models } from "appwrite";
import { Collection } from "appwrite-ooc";
import { databases } from "../appwrite";

export interface Snippet extends Models.Document {
    title: string;
    description: string;
    code: string;
    language: string;
}
export const snippets = new Collection<Snippet>(databases, "snippets", "snippets");
