import * as React from "react";
import { RectButton } from "react-native-gesture-handler";
import { Text } from "../Restyle";
import { ButtonContainer, ButtonProps } from "../Restyle";

const Button: React.FC<ButtonProps> = ({
    label,
    variant,
    onPress,
    style = {},
}: ButtonProps) => {
    const color = variant === "primary" ? "white" : "primaryText";
    return (
        <RectButton {...{ onPress }}>
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
