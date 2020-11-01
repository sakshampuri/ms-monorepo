import * as React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Button, useFirebaseAuth } from "../../Components";
import { Routes, StackNavigationProps } from "../../Components/Routes";
import { Box, Text, theme } from "../../Restyle";
import Spinner from "react-native-loading-spinner-overlay";

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
    const [promptAsync, _, loading] = useFirebaseAuth();
    return (
        <Box flex={1} borderBottomRightRadius='xl' backgroundColor='white'>
            <Spinner visible={loading} textContent='Logging you in...' />
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
