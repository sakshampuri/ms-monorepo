import * as React from "react";
import { Pressable } from "react-native";
import { actionType } from "./Player";
import { AntDesign } from "@expo/vector-icons";

type wrapperType = {
    iconName: string;
    inconSize?: number;
    action: actionType;
    callback?: (action: actionType) => void;
};

export const PLAYER_HEIGHT = 120;
const AudioIcons: React.FC<wrapperType> = ({
    iconName,
    inconSize,
    action,
    callback,
}) => (
    <Pressable
        onPress={() => callback(action)}
        android_ripple={{
            radius: PLAYER_HEIGHT / 2 - 5,
            color: "white",
            borderless: true,
        }}
        style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <AntDesign name={iconName} size={inconSize} color='white' />
    </Pressable>
);

AudioIcons.defaultProps = {
    inconSize: 24,
    callback: () => null,
};

export default AudioIcons;
