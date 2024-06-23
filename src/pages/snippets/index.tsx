import { For } from "solid-js";
import { snippets } from "../../server/database/snippet";
import { atom, dayjs, resource } from "@cn-ui/reactive";
import { BaseInput, TagGroup } from "@cn-ui/core";
import { AppWriteErrorHandler } from "../../server/appwrite";
import { SnippetEditor } from "./SnippetEditor";

export const useWatchingController = () => {
    const watching = atom(null);
    return {
        queryList() {},
        select() {},
        watching,
    };
};

export default () => {
    const snippetsList = resource(
        () => {
            return snippets.listDocuments().then((res) => res.documents);
        },
        {
            onError: AppWriteErrorHandler,
        }
    );
    const selected = atom<string | undefined>(undefined);
    return (
        <section class="flex flex-1">
            <ul class="w-sm flex-none flex flex-col bg-gray-50 ">
                <li class="flex gap-4 p-4 bg-gray-200 ">
                    <BaseInput class="flex-1 bg-white"></BaseInput>
                    <div>搜索</div>
                    <div>新增</div>
                </li>
                <For each={snippetsList()}>
                    {(item) => {
                        return (
                            <li class="text-gray-500 hover:bg-gray-100 transition-colors p-2 mx-4 border-b border-gray-200">
                                <header
                                    class="font-bold cursor-pointer text-gray-800"
                                    onclick={() => selected(item.$id)}>
                                    {item.title}
                                </header>
                                <div class="whitespace-nowrap text-sm my-1 text-ellipsis overflow-hidden">
                                    {item.description}
                                </div>
                                <div class="text-sm">
                                    <span>
                                        {dayjs(item.$createdAt).format(
                                            "YYYY-MM-DD"
                                        )}
                                    </span>

                                    <div>
                                        {/* <TagGroup
                                            v-model={() =>
                                                item.tag.map((i) => ({
                                                    value: i,
                                                    label: i,
                                                }))
                                            }></TagGroup> */}
                                    </div>
                                </div>
                            </li>
                        );
                    }}
                </For>
            </ul>
            <main class="flex-1  flex flex-col p-8 gap-4">
                <SnippetEditor id={selected()}></SnippetEditor>
            </main>
        </section>
    );
};
