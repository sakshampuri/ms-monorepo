import * as React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Box, Text } from "../Restyle";
import MoodItem from "./MoodItem";
import { playlistData } from "./TempData";

interface Props {}

const PlaylistContainer: React.FC<Props> = ({}) => {
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
                    5 playlists
                </Text>
            </Box>
            <FlatList
                indicatorStyle='white'
                data={playlistData}
                showsVerticalScrollIndicator={false}
                bounces={false}
                renderItem={MoodItem}
                keyExtractor={(_, item) => item.toString()}
                contentContainerStyle={{ alignItems: "center" }}
            />
        </Box>
    );
};

export default PlaylistContainer;
