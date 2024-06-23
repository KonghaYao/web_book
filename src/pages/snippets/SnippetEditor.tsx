import { BaseInput, Button, MagicForm } from "@cn-ui/core";
import {
    resource,
    atom,
    type SelectOptionsType,
    StoreToAtom,
    computed,
} from "@cn-ui/reactive";
import { applyTheme, type Expose, FileEditorList } from "monaco-editor-solid";
import { onMount, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { AppWriteErrorHandler } from "../../server/appwrite";
import { type Snippet, snippets } from "../../server/database/snippet";
import type { Models } from "appwrite";

export function SnippetEditor(props: { id?: string }) {
    const defaultData = {
        title: "",
        description: "",
        code: "",
        language: undefined,
        isPublic: false,
    } as Snippet;
    const store = createStore<Snippet>(defaultData);
    const [editingData, setEditingData] = store;
    const snippet = resource(
        async () => {
            if (props.id) {
                return snippets.getDocument(props.id);
            } else {
                return defaultData as Snippet;
            }
        },
        { deps: [() => props.id], initValue: defaultData }
    );
    const isAddingNewOne = computed(
        () => !(snippet() as Models.Document & Snippet).$id
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
            <header class="bg-white font-bold h-12 flex gap-2">
                <BaseInput
                    class="font-bold w-full flex-1 h-8"
                    v-model={StoreToAtom(store, "title")}
                    placeholder="请输入标题"></BaseInput>

                <Button class="h-8" onclick={() => snippet.refetch()}>
                    刷新
                </Button>
                <Button
                    class="h-8"
                    type="primary"
                    disabled={submitAction.loading() || snippet.loading()}
                    onclick={() => submitAction.refetch()}>
                    {isAddingNewOne() ? "新增" : "更新"}
                </Button>
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
                            placeholder: "请输入描述",
                        },
                        {
                            accessorKey: "language",
                            type: "select",
                            placeholder: "请选择语言",
                            options: languageOptions(),
                        },
                    ]}></MagicForm>
            </div>
            <div class="flex-1 border rounded-md">
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
