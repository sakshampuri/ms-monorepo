import * as React from "react";
import { Box, Text } from "../Restyle";
import { AuthContext } from "../Components";

type Props = {};

const Home: React.FC<Props> = () => {
    const { user } = React.useContext(AuthContext).authState;
    return (
        <Box justifyContent='center' flex={1} alignItems='center'>
            <Text variant='title'>HOME</Text>
            <Text variant='title'> Your Name: {user?.name}</Text>
            <Text variant='title'> Your Email: {user?.email}</Text>
        </Box>
    );
};

export default Home;
