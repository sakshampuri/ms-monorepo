import * as React from "react";
import { Box, Text, theme } from "../Restyle";
import { AuthContext } from "../Components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderSlider from "./HeaderSlider";
import PlaylistContainer from "./PlaylistContainer";
import { AntDesign } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { Alert } from "react-native";
import Player from "../AudioPlayer";
import { playerActions, playerStateType } from "../AudioPlayer/types";

// Following is the state set up of the player

// Defaults
const initPlayerState: playerStateType = {
    visible: false,
    currentState: "buffering",
};

// Reducer
const playerStateReducer = (
    state: playerStateType,
    action: playerActions
): playerStateType => {
    switch (action.type) {
        case "request":
            return { ...state, currentState: "buffering" };
        case "success":
            return { ...state, currentState: "playing" };
        case "fail":
            return { ...state, currentState: "paused", error: action.err };
        case "close":
            return { currentState: "paused", visible: false };
        case "launch":
            return {
                currentState: "buffering",
                visible: true,
                playlistId: action.playlistId,
            };
        case "play":
            return { ...state, currentState: "playing" };
        case "pause":
            return { ...state, currentState: "paused" };
    }
};

const Home: React.FC = () => {
    const { authState, changeAuthState } = React.useContext(AuthContext);
    const { user } = authState;

    const insets = useSafeAreaInsets();

    const handleSignOut = () => {
        signOutAlert(() => {
            changeAuthState({ state: undefined, user: undefined });
        });
    };

    const [{ visible, currentState }, dispatch] = React.useReducer(
        playerStateReducer,
        initPlayerState
    );

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
            <PlaylistContainer {...{ dispatch }} />

            {/** Audio Player **/}
            <Player {...{ visible, dispatch, currentState }} />
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
