import {
    createRestyleComponent,
    createVariant,
    VariantProps,
} from "@shopify/restyle";
import * as React from "react";
import { RectButton } from "react-native-gesture-handler";
import { Text } from "../Components";
import { Theme } from "./";

type ButtonProps = VariantProps<Theme, "buttonVariants"> & {
    label: string;
    onPress: () => void;
};

const ButtonVariant = createVariant<Theme>({
    themeKey: "buttonVariants",
    defaults: {
        height: 50,
        width: 255,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
    },
});

const ButtonContainer = createRestyleComponent<
    VariantProps<Theme, "buttonVariants">,
    Theme
>([ButtonVariant]);

const Button: React.FC<ButtonProps> = ({
    label,
    variant,
    onPress,
}: ButtonProps) => {
    const color = variant === "primary" ? "white" : "primaryText";
    return (
        <RectButton {...{ onPress }}>
            <ButtonContainer {...{ variant }}>
                <Text variant='label' {...{ color }}>
                    {label}
                </Text>
            </ButtonContainer>
        </RectButton>
    );
};

Button.defaultProps = {
    variant: "default",
    onPress: () => null,
    label: "Press Me",
};

export default Button;
