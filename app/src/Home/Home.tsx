import * as React from "react";
import { Box, Text } from "../Restyle";
import { AuthContext } from "../Components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ListRenderItem } from "react-native";

type Props = {};

type listenDataType = {
    title: string;
    data: string;
    backgroundColor?: string;
    color?: string;
};

const listeningData: Array<listenDataType> = [
    {
        title: "Playlist Completed",
        data: "34",
        backgroundColor: "#0351D7",
    },
    {
        title: "Total Listening Time",
        data: "842 Mins",
        backgroundColor: "#66BA84",
    },
    {
        title: "Songs Liked",
        data: "82",
        backgroundColor: "#FEFEFE",
        color: "#361A76",
    },
];

const playlistData = [
    {
        id: 1,
        title: "MORNING BOOST",
        author: "Mood Swings Internal Team",
        authorImage:
            "https://images.unsplash.com/photo-1585436664494-c57767009a65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1454&q=80",
        description:
            "Struggling to open up your eyes? Fire this up so we can fire you up",
        duration: 35,
    },
    {
        id: 2,
        title: "AFTERNOON SICKNESS",
        author: "Mood Swings Internal Team",
        authorImage:
            "https://images.unsplash.com/photo-1585436664494-c57767009a65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1454&q=80",
        description:
            "Mid-day overload getting to you? Let us brainwash your mind into serenity",
        duration: 45,
    },
    {
        id: 3,
        title: "ANYTIME SESH",
        author: "Mood Swings Internal Team",
        authorImage:
            "https://images.unsplash.com/photo-1585436664494-c57767009a65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1454&q=80",
        description:
            "Let this collection add the background vibe to your special get together",
        duration: 22,
    },
];

const Home: React.FC<Props> = () => {
    const { user } = React.useContext(AuthContext).authState;

    const insets = useSafeAreaInsets();

    const playlistItemRender = ({ item }) => {
        return (
            <Box
                backgroundColor='white'
                width={325}
                height={170}
                my='s'
                borderRadius='s'
            ></Box>
        );
    };

    return (
        <Box flex={1} backgroundColor='homeDark'>
            {/** HEADER **/}
            <Box
                style={{ marginTop: insets.top }}
                alignItems='flex-start'
                p='l'
            >
                <Text
                    variant='title'
                    color='white'
                    fontFamily='ArialMT'
                    textAlign='left'
                    marginBottom={0}
                >
                    Hi {user.name.split(" ")[0]},
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

                {/** HEADER SCROLLVIEW **/}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {listeningData.map(
                        ({ title, data, backgroundColor, color }, index) => (
                            <Box
                                key={index}
                                width={150}
                                height={71}
                                mx='m'
                                borderRadius='s'
                                style={{ backgroundColor }}
                                alignItems='flex-start'
                                pt='m'
                                pl='m'
                                flex={1}
                            >
                                <Text
                                    variant='subtitle'
                                    fontFamily='ArialMT'
                                    opacity={0.7}
                                    fontSize={10}
                                    style={{ color: color ?? "white" }}
                                >
                                    {title.toUpperCase()}
                                </Text>
                                <Text variant='subtitle' color='white'>
                                    {data.toUpperCase()}
                                </Text>
                            </Box>
                        )
                    )}
                </ScrollView>
            </Box>

            {/** Main Playlist Container **/}
            <Box
                mt='m'
                borderTopLeftRadius='m'
                borderTopRightRadius='m'
                flex={1}
                px='l'
                pt='xl'
                style={{ backgroundColor: "#FAFAFA" }}
            >
                <Box
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Text fontFamily='ArialMT' variant='title' color='homeDark'>
                        Availaible Playlists
                    </Text>
                    <Text fontFamily='ArialMT' variant='subtitle'>
                        5 playlists
                    </Text>
                </Box>
                <FlatList
                    indicatorStyle='white'
                    data={playlistData}
                    renderItem={playlistItemRender}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ alignItems: "center" }}
                />
            </Box>
        </Box>
    );
};

export default Home;
