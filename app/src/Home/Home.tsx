import * as React from "react";
import { Box, Text } from "../Restyle";
import { AuthContext } from "../Components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderSlider from "./HeaderSlider";
import PlaylistContainer from "./PlaylistContainer";

const Home: React.FC = () => {
    const { user } = React.useContext(AuthContext).authState;

    const insets = useSafeAreaInsets();

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
                <HeaderSlider />
            </Box>

            {/** Main Playlist Container **/}
            <PlaylistContainer />
        </Box>
    );
};

export default Home;
