import * as React from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { Button } from "../../Components/index";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 44,
        borderTopLeftRadius: 90,
    },
    subtitle: {
        fontSize: 24,
        fontFamily: "SF-Pro-Semibold",
        color: "#0C0D34",
        marginBottom: 12,
        lineHeight: 30,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "rgba(12,13,52,0.7)",
        textAlign: "center",
        marginBottom: 40,
        fontFamily: "SF-Pro",
    },
});

interface Props {
    subtitle: string;
    description: string;
    buttonOnPress: () => void;
    last?: boolean;
}

const Subslide: React.FC<Props> = ({
    subtitle,
    description,
    last = false,
    buttonOnPress,
}) => {
    return (
        <Animated.View style={styles.container}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.description}>{description}</Text>
            <Button
                label={last ? "Let's get started" : "Next"}
                variant={last ? "primary" : "default"}
                onPress={buttonOnPress}
            />
        </Animated.View>
    );
};

export default Subslide;
