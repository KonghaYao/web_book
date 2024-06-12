/* @refresh reload */
import { HashRouter } from "@solidjs/router";
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import "@unocss/reset/tailwind.css";
import "uno.css";
import "@cn-ui/core/dist/cn-uno.css";
import "./index.css";
import { Layout } from "./Layout";
const pages = import.meta.glob("./pages/**/index.{ts,tsx}");
export const App = () => {
    return (
        <HashRouter>
            {Object.entries(pages).map(([path, modules]) => {
                const p = path
                    .replace("./pages", "")
                    .replace(/index$/, "")
                    .split(".")[0];
                return {
                    path: p,
                    component: lazy(async () => {
                        /** @ts-ignore */
                        const Comp = (await modules()).default;
                        return {
                            default: () => {
                                return (
                                    <Layout>
                                        <Comp />
                                    </Layout>
                                );
                            },
                        };
                    }),
                };
            })}
        </HashRouter>
    );
};

render(() => <App />, document.body!);
