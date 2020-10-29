import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "../../Components";

const { width, height } = Dimensions.get("window");

export const SLIDE_HEIGHT = 0.61 * height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "center",
        width,
    },
    titleContainer: {
        flex: 1,
    },
});

interface SlideProps {
    label: string;
    right?: boolean;
}

export const Slide: React.FC<SlideProps> = ({ label, right }) => {
    const transform = [
        {
            rotate: right ? "90deg" : "-90deg",
        },
    ];
    return (
        <View style={styles.container}>
            <View
                style={{
                    ...styles.titleContainer,
                    transform,
                    alignContent: right ? "flex-end" : "flex-start",
                    marginVertical: 50,
                }}
            >
                <Text variant='hero'>{label}</Text>
            </View>
        </View>
    );
};
