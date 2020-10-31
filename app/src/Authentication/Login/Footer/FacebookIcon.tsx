import * as React from "react";
import Svg, { Path } from "react-native-svg";

function FacebookIcon() {
    return (
        <Svg height={20} width={20} viewBox='0 0 24 24'>
            <Path
                d='M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0 8.064 0 9.95 7.85 9.674 9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877c.188-2.824-.761-5.016 2.051-5.016z'
                fill='#3b5999'
            />
        </Svg>
    );
}

export default FacebookIcon;
