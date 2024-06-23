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
            {[
                {
                    path: "/",
                    component: (props) => {
                        return <Layout>{props.children}</Layout>;
                    },
                    children: Object.entries(pages).map(([path, modules]) => {
                        const p = path
                            .replace("./pages/", "")
                            .split(".")[0]
                            .replace(/index$/, "");

                        return {
                            path: p,
                            component: lazy(modules),
                        };
                    }),
                },
            ]}
        </HashRouter>
    );
};

render(() => <App />, document.body!);
