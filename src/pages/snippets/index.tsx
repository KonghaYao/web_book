import { createEffect, For } from "solid-js";
import {
    PureData,
    type Snippet,
    snippets,
} from "../../server/database/snippet";
import { atom, ObjectAtom, resource } from "@cn-ui/reactive";
import { BaseInput, Button } from "@cn-ui/core";
import { AppWriteErrorHandler } from "../../server/appwrite";

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
            <ul class="w-sm flex-none gap-4 bg-gray-100 p-4">
                <li class="flex">
                    <BaseInput class="flex-1"></BaseInput>
                    <div>搜索</div>
                    <div>新增</div>
                </li>
                <For each={snippetsList()}>
                    {(item) => {
                        return (
                            <li onclick={() => selected(item.$id)}>
                                {item.title}
                            </li>
                        );
                    }}
                </For>
            </ul>
            <main class="flex-1 bg-gray-200">
                <SnippetEditor id={selected()}></SnippetEditor>
            </main>
        </section>
    );
};

function SnippetEditor(props: { id?: string }) {
    const defaultData = {
        title: "",
        description: "",
        code: "",
        language: "",
        isPublic: false,
    };
    const snippet = resource<Snippet>(
        async () => {
            if (props.id) {
                return snippets.getDocument(props.id);
            } else {
                return defaultData as Snippet;
            }
        },
        { deps: [() => props.id], initValue: defaultData }
    );
    const form = ObjectAtom(snippet);

    const submitAction = resource(
        () => {
            if (snippet().$id) {
                return snippets.updateDocument(snippet());
            } else {
                return snippets.createDocument(snippet());
            }
        },
        { immediately: false, onError: AppWriteErrorHandler }
    );
    return (
        <div>
            <header class="bg-white font-bold h-12 flex">
                <span>
                    <BaseInput v-model={form.title}></BaseInput>
                </span>
                <span class="flex-1"></span>
                <span>
                    <Button>刷新</Button>
                    <Button
                        disabled={submitAction.loading()}
                        onclick={() => submitAction.refetch()}>
                        保存
                    </Button>
                </span>
            </header>
            <div>
                <BaseInput
                    type="textarea"
                    v-model={form.description}></BaseInput>
            </div>
            <div>
                <BaseInput v-model={form.code} type="textarea"></BaseInput>
            </div>
        </div>
    );
}
