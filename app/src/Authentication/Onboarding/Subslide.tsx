import * as React from "react";
import { Animated, StyleSheet } from "react-native";
import { Button, Text } from "../../Components/index";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 44,
        borderTopLeftRadius: 90,
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
            <Text variant='title'>{subtitle}</Text>
            <Text variant='subtitle'>{description}</Text>
            <Button
                label={last ? "Let's get started" : "Next"}
                variant={last ? "primary" : "default"}
                onPress={buttonOnPress}
            />
        </Animated.View>
    );
};

export default Subslide;
