import { Audio, AVPlaybackStatus } from "expo-av";
import { Animated, Platform } from "react-native";
import { showErr } from "../Components";
import { playerActions } from "./types";

export const checkPermissionsAsync = async () => {
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
            if (granted)
                Platform.OS === "android" &&
                    Audio.setAudioModeAsync({ staysActiveInBackground: true });
            return granted;
        })
        .catch(() => false);
};

export const fadeAnimation = ({
    animatedInstance,
    toValue,
}: {
    animatedInstance: React.MutableRefObject<Animated.Value>;
    toValue: number;
}): Animated.CompositeAnimation =>
    Animated.timing(animatedInstance.current, {
        toValue,
        duration: 600,
        useNativeDriver: true,
    });

export const _onPlaybackStatusUpdate = (
    dispatch: React.Dispatch<playerActions>
) => (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
        // Update your UI for the unloaded state

        console.log("not loaded");
        if (playbackStatus.isLoaded === false && playbackStatus.error) {
            showErr(
                `Encountered a fatal error during playback: ${playbackStatus.error}`
            );
            // Send Expo team the error on Slack or the forums so we can help you debug!
        }
    } else {
        // Update your UI for the loaded state
        if (playbackStatus.isPlaying) {
            dispatch({ type: "play" });
            console.log("isPlaying");
        } else {
            dispatch({ type: "pause" });
            console.log("paused");
        }

        if (playbackStatus.isBuffering) {
            dispatch({ type: "request" });
            console.log("buffering");
        }

        if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
        }
    }
};
