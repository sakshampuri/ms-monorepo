import * as React from "react";
import { Animated, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2CB9B0",
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
    },
});

interface Props {
    index: number;
    currentIndex: Animated.AnimatedDivision;
}

const PageIndicator: React.FC<Props> = ({ index, currentIndex }) => {
    const opacity = currentIndex.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0.3, 1, 0.3],
        extrapolate: "clamp",
    });

    const scale = currentIndex.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0.7, 1.15, 0.7],
        extrapolate: "clamp",
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity,
                    transform: [{ scale }],
                },
            ]}
        />
    );
};

export default PageIndicator;
