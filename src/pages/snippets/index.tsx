import { createEffect, For, onMount } from "solid-js";
import { type Snippet, snippets } from "../../server/database/snippet";
import {
    atom,
    resource,
    type SelectOptionsType,
    StoreToAtom,
} from "@cn-ui/reactive";
import { BaseInput, Button, MagicForm } from "@cn-ui/core";
import { AppWriteErrorHandler } from "../../server/appwrite";
import { type Expose, FileEditorList, applyTheme } from "monaco-editor-solid";
import { createStore } from "solid-js/store";

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
            <main class="flex-1 bg-gray-200 flex flex-col">
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
    } as Snippet;
    const store = createStore<Snippet>(defaultData);
    const [editingData, setEditingData] = store;
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
    let isMounted = false;
    onMount(() => {
        isMounted = true;
    });
    createEffect(() => {
        setEditingData(() => snippet());
        isMounted &&
            editor()
                ?.watchingEditor.getWatching()
                .monacoEditor?.setValue(snippet().code);
    });
    onMount(() => {
        setTimeout(() => {
            const languageMap: Map<string, unknown> =
                editor()?.watchingEditor.getWatching().monacoEditor
                    ?.languageConfigurationService.configurations;

            if (languageMap) {
                languageOptions(
                    [...languageMap.keys()].map((i) => ({ label: i, value: i }))
                );
                console.log(
                    editor()?.watchingEditor.getWatching().monacoEditor
                );
                applyTheme("github-light");
            }
        }, 200);
    });
    const languageOptions = atom<SelectOptionsType[]>([]);
    const submitAction = resource(
        () => snippets.createOrUpdateDocument(editingData),
        { immediately: false, onError: AppWriteErrorHandler }
    );
    const editor = atom<Expose | undefined>(undefined);
    return (
        <>
            <header class="bg-white font-bold h-12 flex">
                <span>
                    <BaseInput
                        v-model={StoreToAtom(store, "title")}></BaseInput>
                </span>
                <span class="flex-1"></span>
                <span>
                    <Button onclick={() => snippet.refetch()}>刷新</Button>
                    <Button
                        disabled={submitAction.loading()}
                        onclick={() => submitAction.refetch()}>
                        保存
                    </Button>
                </span>
            </header>
            <div>
                <MagicForm
                    showLabel={false}
                    setOriginData={setEditingData}
                    originData={editingData}
                    config={[
                        {
                            accessorKey: "description",
                            type: "text",
                        },
                        {
                            accessorKey: "language",
                            type: "select",
                            options: languageOptions(),
                        },
                    ]}></MagicForm>
            </div>
            <div class="flex-1">
                <FileEditorList
                    files={[
                        // First Editor Show
                        ["temp.js"],
                    ]}
                    fs={{
                        promises: {
                            // create a readFile to loadFile!
                            readFile(fileName: string) {
                                return editingData.code;
                            },
                            writeFile(fileName: string, code: string) {
                                setEditingData("code", code);
                                submitAction.refetch();
                            },
                        },
                    }}
                    toggleExplorer={() => {}}
                    expose={editor}></FileEditorList>
            </div>
        </>
    );
}
