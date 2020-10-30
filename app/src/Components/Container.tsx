import * as React from "react";
import {
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../Restyle";

const styles = StyleSheet.create({});

interface Props {
    children: React.ReactNode;
    footer: React.ReactNode;
    curveRight?: boolean;
}

export const assets = [require("./assets/pattern.png")];

const Container: React.FC<Props> = ({ children, footer, curveRight }) => {
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const height = (width * 750) / 1125;
    return (
        <Box flex={1} backgroundColor='primaryText'>
            {Platform.OS === "ios" && <StatusBar barStyle='light-content' />}
            <Box backgroundColor='white'>
                <Box
                    borderBottomLeftRadius={curveRight ? 0 : "xl"}
                    borderBottomRightRadius={curveRight ? "xl" : 0}
                    width={width}
                    height={height * 0.61}
                    overflow='hidden'
                >
                    <Image
                        resizeMode='repeat'
                        source={assets[0]}
                        style={{
                            height,
                            width,
                        }}
                    />
                </Box>
            </Box>
            <Box flex={1}>
                <Image
                    resizeMode='repeat'
                    source={assets[0]}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        height,
                        width,
                    }}
                />
                <Box
                    flex={1}
                    borderRadius='xl'
                    borderTopLeftRadius={curveRight ? "xl" : 0}
                    borderTopRightRadius={curveRight ? 0 : "xl"}
                    backgroundColor='white'
                >
                    {children}
                </Box>
            </Box>
            <Box
                paddingTop='m'
                style={{ paddingBottom: insets.bottom ? insets.bottom : 10 }}
            >
                {footer}
            </Box>
        </Box>
    );
};

export default Container;
