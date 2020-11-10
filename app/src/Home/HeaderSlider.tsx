import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { StyleSheet } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Text } from "../Restyle";
import { listeningData } from "./TempData";

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 71,
        alignItems: "flex-start",
        flex: 1,
        flexDirection: "column",
    },
});

interface Props {}

const HeaderSlider: React.FC<Props> = ({}) => {
    const theme = useTheme();

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            {listeningData.map(
                ({ title, data, backgroundColor, color }, index) => (
                    <RectButton
                        key={index}
                        style={{
                            ...styles.container,
                            marginHorizontal: theme.spacing.m,
                            borderRadius: theme.borderRadii.s,
                            backgroundColor,
                            paddingTop: theme.spacing.m,
                            paddingLeft: theme.spacing.m,
                        }}
                    >
                        <Text
                            variant='subtitle'
                            fontFamily='ArialMT'
                            opacity={0.7}
                            fontSize={10}
                            mb={0}
                            style={{
                                color: color ?? "white",
                            }}
                        >
                            {title.toUpperCase()}
                        </Text>
                        <Text
                            variant='subtitle'
                            style={{
                                color: color ?? "white",
                            }}
                        >
                            {data.toUpperCase()}
                        </Text>
                    </RectButton>
                )
            )}
        </ScrollView>
    );
};

export default HeaderSlider;
