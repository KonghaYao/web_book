import { Button, GlobalDialog } from "@cn-ui/core";

export default () => {
    return (
        <div>
            <Button
                onclick={() => {
                    GlobalDialog.toggle("login-dialog", true);
                }}>
                登陆窗口
            </Button>
        </div>
    );
};
