import type { JSXElement } from "solid-js";
import { LoginDialog } from "./components/login";

export const Layout = (props: { children: JSXElement }) => {
    return (
        <>
            {props.children}
            <LoginDialog></LoginDialog>
        </>
    );
};
