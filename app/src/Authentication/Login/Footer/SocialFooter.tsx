import * as React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Box, theme } from "../../../Restyle";
import FacebookIcon from "./FacebookIcon";
import GoogleIcon from "./GoogleIcon";
import { useFirebaseAuth } from "../../../Components";
import Spinner from "react-native-loading-spinner-overlay";

const SIZE = 50;
const styles = StyleSheet.create({
    iconContainer: {
        width: SIZE,
        height: SIZE,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZE / 2,
        marginHorizontal: theme.spacing.m,
    },
});

interface Props {}

interface ContainerProps {
    children: React.ReactNode;
    onPress?: () => void | any;
}

const IconContainer: React.FC<ContainerProps> = ({ children, onPress }) => {
    return (
        <RectButton {...{ onPress }} style={styles.iconContainer}>
            {children}
        </RectButton>
    );
};

IconContainer.defaultProps = {
    onPress: () => null,
};

const Footer: React.FC<Props> = ({}) => {
    const [googlePrompt, _, loading] = useFirebaseAuth();

    return (
        <Box flexDirection='row' alignItems='center' justifyContent='center'>
            <Spinner visible={loading} textContent='Logging you in...' />
            <IconContainer onPress={googlePrompt}>
                <GoogleIcon />
            </IconContainer>
            <IconContainer>
                <FacebookIcon />
            </IconContainer>
        </Box>
    );
};

export default Footer;
