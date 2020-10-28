import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

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
    title: {
        fontSize: 80,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
    },
    underlay: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
    },
    picture: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: "center",
        width: undefined,
        height: undefined,
        borderBottomRightRadius: 90,
        borderBottomLeftRadius: 90,
    },
});

interface SlideProps {
    label: string;
    right?: boolean;
    image: number;
}

export const Slide: React.FC<SlideProps> = ({ label, right, image }) => {
    const transform = [
        {
            rotate: right ? "90deg" : "-90deg",
        },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.underlay}>
                <Image source={image} style={styles.picture} />
            </View>
            <View
                style={{
                    ...styles.titleContainer,
                    transform,
                    alignContent: right ? "flex-end" : "flex-start",
                    marginVertical: 50,
                }}
            >
                <Text style={styles.title}>{label}</Text>
            </View>
        </View>
    );
};
