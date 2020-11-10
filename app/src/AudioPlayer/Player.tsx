import * as React from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, Text } from "../Restyle";
import { Audio } from "expo-av";
import { BASE_URL, showErr } from "../Components";
import AudioIcons, { PLAYER_HEIGHT } from "./AudioIcons";
import { EvilIcons } from "@expo/vector-icons";
import { playerActions, playerStateType } from "./types";
import {
    checkPermissionsAsync,
    fadeAnimation,
    _onPlaybackStatusUpdate,
} from "./Utility";
import { AVPlaybackSource } from "expo-av/build/AV";
import { useQuery } from "react-query";
import Spinner from "react-native-loading-spinner-overlay";

interface Props {
    visible: boolean;
    dispatch: React.Dispatch<playerActions>;
    currentState: playerStateType["currentState"];
    playlistId: number | undefined | null;
}

export enum actionType {
    stepbackward = "GO_BACK",
    playcircleo = "PLAY_PAUSE",
    stepforward = "GO_FORWARD",
    pause = "PLAY_PAUSE",
}

const { width } = Dimensions.get("window");

const icons = ["stepbackward", "pause", "stepforward"];

const playMusicAsync = async (
    musicInstance: React.MutableRefObject<Audio.Sound>,
    currentIndex: React.MutableRefObject<number>,
    dispatch: React.Dispatch<playerActions>,
    data: { songs: Array<{ id: number }>; playlistId: number }
) => {
    if (!musicInstance.current) {
        musicInstance.current = new Audio.Sound();
    } else {
        await musicInstance.current.unloadAsync();
        musicInstance.current = null;
    }
    const source: AVPlaybackSource = {
        uri: `${BASE_URL}moods/${data.playlistId}/stream/${
            data.songs[currentIndex.current].id
        }`,
    };
    console.log("current Index: ", currentIndex.current);
    const { sound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: true },
        _onPlaybackStatusUpdate(dispatch),
        false
    );
    musicInstance.current = sound;
};

const Player: React.FC<Props> = ({
    dispatch,
    visible,
    currentState,
    playlistId,
}) => {
    const insets = useSafeAreaInsets();

    //Animation Config
    let y = React.useRef<Animated.Value>(new Animated.Value(PLAYER_HEIGHT));
    let opacity = React.useRef<Animated.Value>(new Animated.Value(1));

    const fadeOut = fadeAnimation({
        animatedInstance: opacity,
        toValue: 0.5,
    });
    const fadeIn = fadeAnimation({
        animatedInstance: opacity,
        toValue: 1,
    });

    const { isLoading, isError, data: songs } = useQuery(
        ["songs", playlistId],
        async (_, playlistId) =>
            fetch(`${BASE_URL}moods/${playlistId}`)
                .then((res) => res.json())
                .then((res) => {
                    return res[0]?.songs;
                })
    );

    // Music Main Instance
    const musicInstance = React.useRef<Audio.Sound>(new Audio.Sound());
    const currentIndex = React.useRef<number>(0);

    React.useEffect(() => {
        currentIndex.current = 0;
    }, [playlistId]);

    React.useEffect(() => {
        if (visible) {
            Animated.spring(y.current, {
                toValue: 0,
                useNativeDriver: true,
            }).start();

            //Permission Check
            checkPermissionsAsync()
                .then((granted) => {
                    if (!granted) {
                        throw new Error("Could not get Permission");
                    } else {
                        if (isLoading) dispatch({ type: "request" });
                        else if (!isError)
                            playMusicAsync(
                                musicInstance,
                                currentIndex,
                                dispatch,
                                {
                                    playlistId,
                                    songs,
                                }
                            ).catch((err) => showErr(err.toString()));
                    }
                })
                .catch((err) => console.log(err));
        } else {
            musicInstance.current
                ?.unloadAsync()
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
            y.current = new Animated.Value(PLAYER_HEIGHT);
        }
    }, [visible, playlistId, isLoading]);

    React.useEffect(() => {
        switch (currentState) {
            case "buffering":
                fadeOut.start();
                break;
            case "playing":
                fadeIn.start();
                break;
            case "paused": {
                fadeIn.start();
                musicInstance.current?.pauseAsync();
            }
        }
    }, [currentState]);

    //Icon Press Actions
    const handlePlayerIconPress = async (action: actionType) => {
        switch (action) {
            case "PLAY_PAUSE":
                {
                    if (currentState === "paused") {
                        dispatch({ type: "play" });
                        await musicInstance.current?.playAsync();
                    } else {
                        dispatch({ type: "pause" });
                        await musicInstance.current?.pauseAsync();
                    }
                }
                break;
            case "GO_BACK":
                {
                    if (currentIndex.current > 0) {
                        currentIndex.current--;
                        playMusicAsync(musicInstance, currentIndex, dispatch, {
                            playlistId,
                            songs,
                        });
                    } else showErr("You're at the beginning of the playlist");
                }
                break;
            case "GO_FORWARD": {
                if (currentIndex.current < songs.length - 1) {
                    currentIndex.current++;
                    playMusicAsync(musicInstance, currentIndex, dispatch, {
                        songs,
                        playlistId,
                    });
                } else showErr("Reached End of Playlist");
            }
        }
    };

    if (isError) return <Text>Could Not fetch Songs</Text>;
    return (
        <>
            {visible && (
                <Animated.View
                    style={{
                        transform: [{ translateY: y.current }],
                        opacity: opacity.current,
                        width,
                        height: PLAYER_HEIGHT,
                        paddingBottom: insets.bottom,
                    }}
                >
                    <Spinner visible={isLoading} />
                    {!isLoading && (
                        <Text variant='title' color='white'>
                            {songs[currentIndex.current].title}
                        </Text>
                    )}
                    <Box
                        flex={1}
                        flexDirection='row'
                        justifyContent='space-around'
                        alignItems='center'
                        px='m'
                    >
                        {icons.map((name, index) => {
                            const inconSize = name === "pause" ? 30 : 24;
                            if (name === "pause")
                                if (currentState === "buffering")
                                    return (
                                        <ActivityIndicator
                                            color='white'
                                            style={{ flex: 1 }}
                                            key={index}
                                        />
                                    );
                                else if (currentState === "paused")
                                    name = "playcircleo";
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
                        onPress={() => dispatch({ type: "close" })}
                    />
                </Animated.View>
            )}
        </>
    );
};

export default Player;
