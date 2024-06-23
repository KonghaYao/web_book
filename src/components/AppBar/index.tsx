import { A } from "@solidjs/router";
import { For } from "solid-js";

export const AppBar = () => {
    return (
        <ul>
            <For
                each={[
                    {
                        path: "/",
                        name: "首页",
                    },
                    {
                        path: "/snippets",
                        name: "代码片段",
                    },
                ]}>
                {(item) => {
                    return (
                        <li>
                            <A href={item.path}>{item.name}</A>
                        </li>
                    );
                }}
            </For>
        </ul>
    );
};
