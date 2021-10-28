import { memo } from "react";
import { Template } from "./Template";
import type { KcProps, KcContextBase } from "keycloakify";
import { useKcMessage } from "keycloakify";

export const Error = memo(({ kcContext, ...props }: { kcContext: KcContextBase.Error } & KcProps) => {
    const { msg } = useKcMessage();

    const { message, client } = kcContext;

    return (
        <Template
            {...{ kcContext, ...props }}
            doFetchDefaultThemeResources={true}
            displayMessage={false}
            headerNode={msg("errorTitle")}
            formNode={
                <div id="kc-error-message">
                    <p className="instruction">{message.summary}</p>
                    {client !== undefined && client.baseUrl !== undefined && (
                        <p>
                            <a id="backToApplication" href={client.baseUrl}>
                                {msg("backToApplication")}
                            </a>
                        </p>
                    )}
                </div>
            }
        />
    );
});
