/* @refresh reload */
import { HashRouter } from "@solidjs/router";
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import "uno.css";
import "@cn-ui/core/dist/cn-uno.css";
import { Layout } from "./Layout";
const pages = import.meta.glob("./pages/**/index.{ts,tsx}");
export const App = () => {
    return (
        <HashRouter>
            {Object.entries(pages).map(([path, modules]) => {
                return {
                    path: path
                        .replace("../pages", "")
                        .replace(/index$/, "")
                        .split(".")[0],
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

const root = document.getElementById("root");

render(() => <App />, root!);
