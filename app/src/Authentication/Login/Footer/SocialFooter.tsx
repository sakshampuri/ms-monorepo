import * as React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Box, theme } from "../../../Restyle";
import FacebookIcon from "./FacebookIcon";
import GoogleIcon from "./GoogleIcon";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import firebase from "firebase";
import { FirebaseContext } from "../../../Components";

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
    onPress?: () => void;
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
    const firebaseConfig = React.useContext(FirebaseContext).config;
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log("inputconfig: ", firebaseConfig);
    }

    console.log(firebaseConfig);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: Constants.manifest.extra.clientId,
    });

    // React.useEffect(() => {
    //     if (response?.type === "success") {
    //         console.log(response);
    //         const { id_token } = response.params;

    //         const credential = firebase.auth.GoogleAuthProvider.credential(
    //             id_token
    //         );
    //         console.log(credential);
    //         firebase.auth().signInWithCredential(credential);
    //         const user = firebase.auth().currentUser;
    //         console.log(user);
    //     }
    // }, [response]);

    return (
        <Box flexDirection='row' alignItems='center' justifyContent='center'>
            <IconContainer onPress={promptAsync}>
                <GoogleIcon />
            </IconContainer>
            <IconContainer>
                <FacebookIcon />
            </IconContainer>
        </Box>
    );
};

export default Footer;
