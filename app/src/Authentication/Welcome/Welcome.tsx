import * as React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Button } from "../../Components";
import { Routes, StackNavigationProps } from "../../Components/Routes";
import { Box, Text, theme } from "../../Restyle";
import firebase from "firebase";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { FirebaseContext, firebaseContextInfo } from "../../Components";

if (!firebase.apps.length) {
    const config = firebaseContextInfo.config;
    firebase.initializeApp(config);
    console.log("inputconfig: ", config);
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    picture: {
        borderBottomRightRadius: 90,
        width: width,
        height: (width - theme.borderRadii.xl) * 1.5,
    },
});

interface Props {}

const picture = require("../../../assets/images/5.jpg");

const Welcome: React.FC<Props> = ({
    navigation,
}: StackNavigationProps<Routes, "Welcome">) => {
    const firebaseConfig = React.useContext(FirebaseContext).config;
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: Constants.manifest.extra.clientId,
    });

    React.useEffect(() => {
        if (response?.type === "success") {
            console.log(response);
            const { id_token } = response.params;

            const credential = firebase.auth.GoogleAuthProvider.credential(
                id_token
            );
            console.log(credential);
            firebase.auth().signInWithCredential(credential);
            const user = firebase.auth().currentUser;
            console.log(user);
        }
    }, [response]);

    return (
        <Box flex={1} borderBottomRightRadius='xl' backgroundColor='white'>
            <Box flex={1} alignItems='center' justifyContent='flex-end'>
                <Image source={picture} style={styles.picture} />
            </Box>
            <Box flex={1} borderTopLeftRadius='xl'>
                <Box
                    backgroundColor='darkBrown'
                    style={{ ...StyleSheet.absoluteFillObject }}
                />
                <Box
                    backgroundColor='white'
                    padding='xl'
                    borderTopLeftRadius='l'
                    flex={1}
                >
                    <Text variant='title' marginTop='xl'>
                        Let's Get Started
                    </Text>
                    <Text variant='subtitle'>
                        Sign-up or Login below to continue your experience
                    </Text>

                    <Button
                        label='Login With Google 🅖'
                        variant='primary'
                        style={{ marginVertical: 10 }}
                        onPress={promptAsync}
                    />
                    <Button
                        label='Login With Email ID'
                        variant='default'
                        onPress={() => navigation.navigate("Login")}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Welcome;
