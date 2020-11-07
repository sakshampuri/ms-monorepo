import * as React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../Restyle";
import { Audio } from "expo-av";
import { showErr } from "../Components";
import AudioIcons, { PLAYER_HEIGHT } from "./AudioIcons";
import { EvilIcons } from "@expo/vector-icons";

interface Props {
    visible: boolean;
    changePlayerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum actionType {
    stepbackward = "GO_BACK",
    playcircleo = "PLAY_PAUSE",
    stepforward = "GO_FORWARD",
}

const { width } = Dimensions.get("window");

const songs = [
    "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
    "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
];

const icons = ["stepbackward", "playcircleo", "stepforward"];

const playMusicAsync = async (
    instance: React.MutableRefObject<Audio.Sound>
) => {
    await instance.current.loadAsync({ uri: songs[0] });
    await instance.current.playAsync();
};

const checkPermissionsAsync = async () => {
    return Audio.getPermissionsAsync()
        .then((response) => {
            if (!response.granted) {
                Audio.requestPermissionsAsync()
                    .then((response) => {
                        if (!response.granted) {
                            showErr("Permission Not Granted");
                            return false;
                        } else return true;
                    })
                    .catch(() => false);
            } else return true;
        })
        .then((granted) => {
            if (granted) {
                Audio.setAudioModeAsync({ staysActiveInBackground: true });
            }
            return granted;
        })
        .catch(() => false);
};

const Player: React.FC<Props> = ({ visible = false, changePlayerVisible }) => {
    const insets = useSafeAreaInsets();

    //Animation Config
    let y = new Animated.Value(PLAYER_HEIGHT);

    const musicInstance = React.useRef(new Audio.Sound());

    React.useEffect(() => {
        if (visible) {
            Animated.spring(y, {
                toValue: 0,
                useNativeDriver: true,
            }).start(() => {
                y = new Animated.Value(PLAYER_HEIGHT);
            });

            //Permission Check
            checkPermissionsAsync()
                .then((granted) => {
                    if (!granted) {
                        throw new Error("Could not get Permission");
                    } else {
                        playMusicAsync(musicInstance).catch((err) => {
                            showErr(err.toString());
                        });
                    }
                })
                .catch((err) => console.log(err));
        } else
            musicInstance.current
                .unloadAsync()
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
    }, [visible]);

    //Icon Press Actions
    const handlePlayerIconPress = (action: actionType) => () => {};

    return (
        <>
            {visible && (
                <Animated.View
                    style={{
                        transform: [{ translateY: y }],
                        width,
                        height: PLAYER_HEIGHT,
                        paddingBottom: insets.bottom,
                    }}
                >
                    <Box
                        flex={1}
                        flexDirection='row'
                        justifyContent='space-around'
                        alignItems='center'
                        px='m'
                    >
                        {icons.map((name, index) => {
                            const inconSize = name === "playcircleo" ? 30 : 24;
                            return (
                                <AudioIcons
                                    iconName={name}
                                    action={actionType[name]}
                                    {...{ inconSize }}
                                    callback={handlePlayerIconPress}
                                    key={index}
                                />
                            );
                        })}
                    </Box>
                    <EvilIcons
                        name='close'
                        size={24}
                        color='white'
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            left: width - 28,
                            paddingTop: 5,
                        }}
                        onPress={() => changePlayerVisible(false)}
                    />
                </Animated.View>
            )}
        </>
    );
};

export default Player;
