import { For } from "solid-js";
import { snippets } from "../../server/database/snippet";
import { atom, dayjs, usePagination } from "@cn-ui/reactive";
import { BaseInput } from "@cn-ui/core";
import { SnippetEditor } from "./SnippetEditor";
import { Query } from "appwrite";

export const useWatchingController = () => {
    const watching = atom(null);
    return {
        queryList() {},
        select() {},
        watching,
    };
};

export default () => {
    const searchText = atom("");
    const snippetsList = usePagination((pageIndex: number, maxPage, count) => {
        return snippets
            .listDocuments(
                [
                    searchText() && Query.search("title", searchText()),
                    Query.offset(pageIndex),
                ].filter(Boolean)
            )
            .then((res) => {
                count(res.total);
                maxPage(Math.ceil(res.total / 25));
                return res.documents;
            });
    });

    const selected = atom<string | undefined>(undefined);
    return (
        <section class="flex flex-1 h-screen">
            <header class="w-sm flex-none flex flex-col bg-gray-50 ">
                <nav class="flex gap-4 p-4 bg-gray-200">
                    <BaseInput
                        v-model={searchText}
                        class="flex-1 bg-white"
                        placeholder="请输入标题"></BaseInput>
                    <button onclick={snippetsList.refetch}>搜索</button>
                    <button onclick={() => selected(undefined)}>新增</button>
                </nav>
                <ul class="flex flex-col  overflow-auto pb-12">
                    <For each={snippetsList.currentData()}>
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
            </header>
            <main class="flex-1 overflow-hidden flex flex-col p-8 gap-4">
                <SnippetEditor id={selected()}></SnippetEditor>
            </main>
        </section>
    );
};
