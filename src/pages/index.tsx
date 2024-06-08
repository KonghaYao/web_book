import { Button, GlobalDialog } from "@cn-ui/core";

export default () => {
    return (
        <div>
            23243423
            <Button
                onclick={() => {
                    console.log("hei");
                    console.log(GlobalDialog);
                    GlobalDialog.toggle("login-dialog", true);
                }}>
                123893489
            </Button>
        </div>
    );
};
