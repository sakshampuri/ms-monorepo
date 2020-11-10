import * as React from "react";
import { RectButton } from "react-native-gesture-handler";
import { Box, Text, theme } from "../Restyle";

const playColors = ["#FF752F", "#862AFF", "#076258"];
const MoodItem = ({ item }) => (
    <RectButton
        style={{
            backgroundColor: "#FAFAFA",
            width: 325,
            height: 170,
            marginVertical: theme.spacing.s,
            borderRadius: theme.borderRadii.s,
            alignItems: "flex-start",
            padding: theme.spacing.m,
        }}
    >
        <Text
            variant='title'
            fontSize={16}
            style={{ color: playColors[item.id % playColors.length] }}
        >
            {item.title}
        </Text>
        <Text
            variant='subtitle'
            style={{ textAlign: "left", color: "#173B68" }}
        >
            {item.description}
        </Text>
        <Box flex={1} alignContent='flex-end' flexDirection='row'>
            <Text px='s' style={{ color: "#8094AD" }}>
                by
            </Text>
            <Text style={{ color: "#173B68" }}>Mood Swings Internal</Text>
        </Box>
    </RectButton>
);
export default MoodItem;
