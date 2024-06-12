import { A } from "@solidjs/router";
import { For } from "solid-js";

export const AppBar = () => {
    return (
        <ul>
            <For
                each={[
                    {
                        path: "/index",
                        name: "首页",
                    },
                    {
                        path: "/snippets/index",
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
