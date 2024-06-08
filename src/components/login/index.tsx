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
import { user } from "../../server/appwrite";

registerAllControlComponent();

interface UserConfig {
    email: string;
    password: string;
}

const loginConfig = [
    {
        accessorKey: "email",
        type: "text",
    },
    {
        accessorKey: "password",
        type: "text",
    },
] satisfies ColumnDef<UserConfig>[];

export const LoginDialog = () => {
    const [originData, setOriginData] = createStore<UserConfig>({
        email: "",
        password: "",
    });
    console.log(GlobalDialog);
    return (
        <Dialog id="login-dialog" v-model={atom(true)}>
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
