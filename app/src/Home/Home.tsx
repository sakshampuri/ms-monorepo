import * as React from "react";
import { Box, Text, theme } from "../Restyle";
import { AuthContext } from "../Components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderSlider from "./HeaderSlider";
import PlaylistContainer from "./PlaylistContainer";
import { AntDesign } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { Alert } from "react-native";

const Home: React.FC = () => {
    const { authState, changeAuthState } = React.useContext(AuthContext);
    const { user } = authState;

    const insets = useSafeAreaInsets();

    const handleSignOut = () => {
        signOutAlert(() => {
            changeAuthState({ state: undefined, user: undefined });
        });
    };

    return (
        <Box flex={1} backgroundColor='homeDark'>
            {/** HEADER **/}
            <Box
                style={{ marginTop: insets.top }}
                alignItems='flex-start'
                p='l'
            >
                <Box flexDirection='row'>
                    <Box>
                        <Text
                            variant='title'
                            color='white'
                            fontFamily='ArialMT'
                            textAlign='left'
                            marginBottom={0}
                        >
                            Hi {user?.name.split(" ")[0]},
                        </Text>
                        <Text
                            variant='subtitle'
                            fontFamily='ArialMT'
                            color='white'
                            opacity={0.6}
                            mb='l'
                        >
                            Here is your weekly listening history
                        </Text>
                    </Box>

                    <BorderlessButton
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            flex: 1,
                            marginTop: theme.spacing.m,
                        }}
                        shouldCancelWhenOutside={true}
                        rippleColor={"rgba(0,0,0,0)"}
                        activeOpacity={0.5}
                        onPress={handleSignOut}
                    >
                        <AntDesign name='poweroff' size={18} color='white' />
                    </BorderlessButton>
                </Box>

                {/** HEADER SCROLLVIEW **/}
                <HeaderSlider />
            </Box>

            {/** Main Playlist Container **/}
            <PlaylistContainer />
        </Box>
    );
};

const signOutAlert = (triggerSignout: () => void) => {
    Alert.alert("Confirm", "Are you sure you want to log out?", [
        {
            text: "Cancel",
            style: "cancel",
        },
        {
            text: "OK",
            style: "default",
            onPress: triggerSignout,
        },
    ]);
};

export default Home;
