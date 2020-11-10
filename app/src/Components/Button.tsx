import * as React from "react";
import { RectButton } from "react-native-gesture-handler";
import { Text, theme } from "../Restyle";
import { ButtonContainer, ButtonProps } from "../Restyle";

const Button: React.FC<ButtonProps> = ({
    label,
    variant,
    onPress,
    style = {},
}: ButtonProps) => {
    const color = variant === "primary" ? "white" : "primaryText";
    return (
        <RectButton
            {...{ onPress }}
            style={{
                height: 50,
                width: 255,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
            }}
        >
            <ButtonContainer {...{ variant, style }}>
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
