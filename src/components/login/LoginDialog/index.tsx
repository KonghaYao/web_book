import {
    type ColumnDef,
    Dialog,
    MagicForm,
    registerAllControlComponent,
    GlobalDialog,
    Button,
} from "@cn-ui/core";
import { atom } from "@cn-ui/reactive";
import { createStore } from "solid-js/store";
import { user } from "../../../server/appwrite";

registerAllControlComponent();

interface UserConfig {
    email: string;
    password: string;
}

const loginConfig = [
    {
        accessorKey: "email",
        type: "text",
        span: 24,
    },
    {
        accessorKey: "password",
        type: "text",
        span: 24,
    },
] satisfies ColumnDef<UserConfig>[];

export const LoginDialog = () => {
    const [originData, setOriginData] = createStore<UserConfig>({
        email: "",
        password: "",
    });
    return (
        <Dialog id="login-dialog" v-model={atom(false)}>
            <MagicForm
                config={loginConfig}
                setOriginData={setOriginData}
                originData={originData}></MagicForm>
            <Button
                onclick={() =>
                    user.loginWithEmail(originData.email, originData.password)
                }>
                登陆
            </Button>
        </Dialog>
    );
};
