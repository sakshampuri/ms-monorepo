import * as React from "react";
import { useWindowDimensions } from "react-native";
import Svg, { G, Path, Rect } from "react-native-svg";

function Pattern(props: React.SVGProps<SVGSVGElement>) {
    const { width } = useWindowDimensions();
    return (
        <Svg
            width={width}
            height={width * 0.5}
            viewBox='0 0 375.5 189.222'
            {...props}
        >
            <G transform='rotate(90 188 187.5)'>
                <Path fill='#ececf4' d='M.5.5h188v375H.5z' />
                <Path
                    data-name='Shape'
                    d='M95.222 125h31.5v63h-31.5a31.5 31.5 0 01-31.5-31.5 31.5 31.5 0 0131.5-31.5z'
                    fill='#111747'
                />
                <Path
                    data-name='Shape'
                    fill='#111747'
                    d='M126.722 125h63v63h-63z'
                />
                <Path
                    data-name='Shape'
                    d='M158.222 63a31.5 31.5 0 0131.5 31.5V126h-62.811a.189.189 0 01-.189-.189V94.5a31.5 31.5 0 0131.5-31.5zM158.222 312a31.5 31.5 0 0131.5 31.5V375h-63v-31.5a31.5 31.5 0 0131.5-31.5z'
                    fill='#ff87a2'
                />
                <Path
                    data-name='Shape'
                    d='M65.422 187h61.3v31.5a31.5 31.5 0 01-31.5 31.5 31.5 31.5 0 01-31.5-31.5v-29.8a1.7 1.7 0 011.7-1.7z'
                    fill='#2cb9b0'
                />
                <Path
                    data-name='Shape'
                    d='M189.722 187h-63c0-17.121 14.1-31 31.5-31s31.5 13.879 31.5 31z'
                    fill='#fe5e33'
                />
                <Path
                    data-name='Shape'
                    fill='#ffc641'
                    d='M126.722 187h63v63h-63z'
                />
                <Path
                    data-name='Shape'
                    d='M126.722 249h63v31.5a31.5 31.5 0 01-31.5 31.5 31.5 31.5 0 01-31.5-31.5V249z'
                    fill='#ffc641'
                />
                <Path
                    data-name='Shape'
                    fill='#111747'
                    d='M.5 312.5h63v63H.5z'
                />
                <Path
                    data-name='Shape'
                    fill='#2cb9b0'
                    d='M.722 63h63v63h-63z'
                />
                <Path
                    data-name='Shape'
                    fill='#fe5e33'
                    d='M.722 187h63v63h-63z'
                />
                <Rect
                    data-name='Shape'
                    width={63}
                    height={63}
                    rx={31.5}
                    transform='translate(.722 125)'
                    fill='#ff87a2'
                />
                <Path
                    data-name='Shape'
                    d='M63.722 125h63c0 17.121-14.1 31-31.5 31s-31.5-13.879-31.5-31z'
                    fill='#ff87a2'
                />
                <Path
                    data-name='Shape'
                    fill='#ff87a2'
                    d='M63.722 63h63v63h-63zM126.722 63h-63c0-17.121 14.1-31 31.5-31s31.5 13.879 31.5 31z'
                />
                <Path
                    data-name='Shape'
                    d='M126.722 0a31 31 0 01-31 31 31 31 0 0131-31z'
                    fill='#06818e'
                />
                <Path
                    data-name='Shape'
                    d='M63.722 63a31 31 0 0131-31 31 31 0 01-31 31z'
                    fill='#111747'
                />
                <Path
                    data-name='Shape'
                    d='M111.222 122a31.878 31.878 0 01-15.5-27.5 31.878 31.878 0 0115.5-27.5 31.878 31.878 0 0115.5 27.5 31.878 31.878 0 01-15.5 27.5z'
                    fill='#fff'
                />
                <Path
                    data-name='Shape'
                    d='M63.722 63a31 31 0 01-31 31 31 31 0 0131-31z'
                    fill='#ffc641'
                />
                <Path
                    data-name='Shape'
                    d='M63.722 250v-63c17.121 0 31 14.1 31 31.5s-13.879 31.5-31 31.5z'
                    fill='#fe5e33'
                />
                <Path
                    data-name='Shape'
                    d='M.722 250a31 31 0 0131-31 31 31 0 01-31 31z'
                    fill='#2cb9b0'
                />
                <Rect
                    data-name='Shape'
                    width={63}
                    height={63}
                    rx={31.5}
                    transform='translate(.722)'
                    fill='#06818e'
                />
                <Path
                    data-name='Shape'
                    d='M.722 124a31 31 0 0131-31 31 31 0 01-31 31z'
                    fill='#06818e'
                />
                <Path
                    data-name='Shape'
                    d='M47.972 308a31.86 31.86 0 010-55 31.86 31.86 0 010 55zm-31.5 0a31.86 31.86 0 010-55 31.8 31.8 0 0111.406 11.4 31.91 31.91 0 014.344 16.1 31.908 31.908 0 01-4.344 16.1A31.8 31.8 0 0116.472 308z'
                    fill='#2cb9b0'
                />
                <Rect
                    data-name='Shape'
                    width={63}
                    height={63}
                    rx={31.5}
                    transform='translate(126.722 249)'
                    fill='#2cb9b0'
                />
                <Rect
                    data-name='Shape'
                    width={63}
                    height={63}
                    rx={31.5}
                    transform='translate(94.722 219)'
                    fill='#fff'
                />
                <Rect
                    data-name='Shape'
                    width={63}
                    height={63}
                    rx={31.5}
                    transform='translate(126.722 187)'
                    fill='#fe5e33'
                />
                <Path
                    data-name='Shape'
                    d='M158.222 141a15.5 15.5 0 11-15.5 15.5 15.5 15.5 0 0115.5-15.5z'
                    fill='#ffc641'
                />
                <Path
                    data-name='Shape'
                    d='M32.222 141a15.5 15.5 0 11-15.5 15.5 15.5 15.5 0 0115.5-15.5z'
                    fill='#111747'
                />
                <Path
                    data-name='Shape'
                    d='M95.222 265a15.5 15.5 0 11-15.5 15.5 15.5 15.5 0 0115.5-15.5z'
                    fill='#2cb9b0'
                />
                <Path
                    data-name='Shape'
                    d='M32.222 265a15.5 15.5 0 11-15.5 15.5 15.5 15.5 0 0115.5-15.5z'
                    fill='#fe5e33'
                />
                <Path
                    data-name='Shape'
                    d='M95.222 203a15.5 15.5 0 11-15.5 15.5 15.5 15.5 0 0115.5-15.5z'
                    fill='#111747'
                />
                <Path
                    data-name='Shape'
                    d='M126.722 0h63v31.5a31.5 31.5 0 01-31.5 31.5 31.5 31.5 0 01-31.5-31.5V0z'
                    fill='#06818e'
                />
                <Path
                    data-name='Shape'
                    d='M156.722 31a31 31 0 0131-31 31 31 0 01-31 31zM63.5 312.5h63v63h-63z'
                    fill='#fe5e33'
                />
                <Path
                    data-name='Shape'
                    d='M126.722 313h-63c0-17.121 14.1-31 31.5-31s31.5 13.879 31.5 31z'
                    fill='#fe5e33'
                />
                <Path
                    data-name='Shape'
                    d='M32.722 343a31 31 0 0131-31 31 31 0 01-31 31z'
                    fill='#2cb9b0'
                />
                <Path
                    data-name='Shape'
                    d='M63.722 32a31.3 31.3 0 01-12.26-2.475 31.4 31.4 0 01-10.013-6.751 31.4 31.4 0 01-6.751-10.013A31.3 31.3 0 0132.222.5a31.474 31.474 0 0131.5 31.5zm-63 0A31.474 31.474 0 0132.222.5a31.3 31.3 0 01-2.475 12.261 31.4 31.4 0 01-6.751 10.013 31.4 31.4 0 01-10.013 6.751A31.3 31.3 0 01.722 32z'
                    fill='#111747'
                />
                <Path
                    data-name='Shape'
                    d='M189.722 282a31.474 31.474 0 01-31.5-31.5 31.3 31.3 0 01-2.475 12.261 31.4 31.4 0 01-6.751 10.013 31.4 31.4 0 01-10.013 6.751A31.3 31.3 0 01126.722 282a31.474 31.474 0 0131.5-31.5 31.3 31.3 0 01-12.26-2.475 31.4 31.4 0 01-10.014-6.751 31.4 31.4 0 01-6.751-10.013A31.3 31.3 0 01126.722 219a31.3 31.3 0 0112.261 2.475 31.4 31.4 0 0110.013 6.751 31.4 31.4 0 016.751 10.013 31.3 31.3 0 012.475 12.261 31.474 31.474 0 0131.5-31.5 31.3 31.3 0 01-2.475 12.261 31.4 31.4 0 01-6.751 10.013 31.4 31.4 0 01-10.013 6.751 31.3 31.3 0 01-12.261 2.475 31.474 31.474 0 0131.5 31.5z'
                    fill='#2cb9b0'
                />
            </G>
        </Svg>
    );
}

export default Pattern;
