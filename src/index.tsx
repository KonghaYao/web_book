/* @refresh reload */
import { HashRouter } from "@solidjs/router";
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import '@cn-ui/core/dist/cn-uno.css'
const pages = import.meta.glob("../pages/**/index.{ts,tsx}");
export const App = () => {
    return (
        <HashRouter>
            {Object.entries(pages).map(([path, modules]) => {
                return {
                    path: path.replace("../pages", "").split(".")[0],
                    component: lazy(modules as any),
                };
            })}
        </HashRouter>
    );
};

const root = document.getElementById("root");

render(() => <App />, root!);
