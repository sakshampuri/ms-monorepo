import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        height: 50,
        width: 255,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18,
        color: "white",
    },
});

interface ButtonProps {
    label: string;
    variant: "primary" | "default";
    onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, variant, onPress }) => {
    const backgroundColor =
        variant === "primary" ? "#2CB9B0" : "rgba(12,13,52, 0.05)";
    const color = variant === "primary" ? "white" : "#0C0D34";
    return (
        <RectButton
            {...{ onPress }}
            style={[styles.container, { ...{ backgroundColor } }]}
        >
            <Text style={[styles.label, { ...{ color } }]}>{label}</Text>
        </RectButton>
    );
};

Button.defaultProps = {
    variant: "default",
};

export default Button;
