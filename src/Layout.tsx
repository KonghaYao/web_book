import type { JSXElement } from "solid-js";
import { LoginDialog } from "./components/login/LoginDialog";
import { user } from "./server/appwrite";
import { GlobalDialog } from "@cn-ui/core";
import { AppBar } from "./components/AppBar";

export const Layout = (props: { children: JSXElement }) => {
    user.isLogin()
        .then((res) => {})
        .catch((e) => {
            GlobalDialog.toggle("login-dialog", true);
        });
    return (
        <section class="h-screen w-full overflow-hidden flex">
            <AppBar></AppBar>
            {props.children}
            <LoginDialog></LoginDialog>
        </section>
    );
};
