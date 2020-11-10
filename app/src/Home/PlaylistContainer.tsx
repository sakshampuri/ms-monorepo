import * as React from "react";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { playerActions } from "../AudioPlayer/types";
import { Box, Text } from "../Restyle";
import MoodItem from "./MoodItem";
import { BASE_URL } from "../Components";

interface Props {
    dispatch: React.Dispatch<playerActions>;
}

const PlaylistContainer: React.FC<Props> = ({ dispatch }) => {
    // Data detching query
    const { isLoading, isError, data: playlistData } = useQuery("moods", () =>
        fetch(`${BASE_URL}moods/`).then((res) => res.json())
    );

    return (
        <Box
            mt='m'
            borderTopLeftRadius='m'
            borderTopRightRadius='m'
            flex={1}
            px='l'
            pt='xl'
            backgroundColor='white'
        >
            {isLoading ? (
                <ActivityIndicator />
            ) : isError ? (
                <Text>Error</Text>
            ) : (
                <>
                    <Box flexDirection='row' justifyContent='space-between'>
                        <Text
                            fontFamily='ArialMT'
                            variant='title'
                            color='homeDark'
                            style={{ textAlignVertical: "center" }}
                        >
                            Availaible Playlists
                        </Text>
                        <Text
                            fontFamily='ArialMT'
                            variant='subtitle'
                            style={{ textAlignVertical: "center" }}
                        >
                            {playlistData.length} playlists
                        </Text>
                    </Box>
                    <FlatList
                        indicatorStyle='white'
                        data={playlistData}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        renderItem={({ item }) => (
                            <MoodItem {...{ item, dispatch }} />
                        )}
                        keyExtractor={(_, item) => item.toString()}
                        contentContainerStyle={{ alignItems: "center" }}
                    />
                </>
            )}
        </Box>
    );
};

export default PlaylistContainer;
