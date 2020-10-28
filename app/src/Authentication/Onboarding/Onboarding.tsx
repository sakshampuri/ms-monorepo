import * as React from "react";
import {
    StyleSheet,
    useWindowDimensions,
    View,
    Animated,
    ScrollView,
} from "react-native";
import { Slide } from "./Slide";
import { SLIDE_HEIGHT } from "./Slide";
import Subslide from "./Subslide";
import { PageIndicator } from "../../Components/index";
export const BORDER_RADIUS = 90;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    slider: {
        height: SLIDE_HEIGHT,
        borderBottomRightRadius: 90,
    },
    footer: {
        flex: 1,
    },
    footerUnderlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "cyan",
    },
    footerOverlay: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 90,
    },
    pagination: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: BORDER_RADIUS,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
    },
});

export const slides = [
    {
        title: "Your Own",
        subtitle: "Feeling Down? We got you",
        description: "Specify your mood and we will try our best to enhance it",
        color: "#212626",
        image: require("../../../assets/images/1.jpg"),
    },
    {
        title: "‘Vibe’-ful",
        subtitle: "Your Vibe, Our Music",
        description:
            "Our Machine Learning Model tries to match your vibe to boost your current experience",
        color: "#303030",
        image: require("../../../assets/images/2.jpg"),
    },
    {
        title: "Excentric",
        subtitle: "Get pumped up",
        description:
            "We aim to energize your lazy daytime durations and convert you into a productivity powerhousr",
        color: "#F1F1F3",
        image: require("../../../assets/images/3.jpg"),
    },
    {
        title: "Funky",
        subtitle: "Feeling Left Out?",
        description:
            "Create your own playlist by selecting curated songs to train the model to your specific needs.",
        color: "#CB637E",
        image: require("../../../assets/images/4.jpg"),
    },
];

const Onboarding: React.FC = () => {
    const width = useWindowDimensions().width;
    const scroll = React.useRef<ScrollView>(null);

    const x = React.useRef(new Animated.Value(0)).current;

    const backgroundColor = x.interpolate({
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map((slide) => slide.color),
    });

    const buttonOnPress = (index: number) => () => {
        if (scroll.current) {
            scroll.current.scrollTo({ x: width * (index + 1), animated: true });
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { backgroundColor }]}>
                <Animated.ScrollView
                    snapToInterval={width}
                    ref={scroll}
                    pagingEnabled
                    horizontal
                    decelerationRate='fast'
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: x,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                >
                    {slides.map(({ title: label, image }, index) => (
                        <Slide
                            label={label}
                            right={!!(index % 2)}
                            key={index}
                            image={image}
                        />
                    ))}
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View
                    style={[styles.footerUnderlay, { backgroundColor }]}
                />

                <View style={styles.footerOverlay}>
                    <View style={styles.pagination}>
                        {slides.map((_, index) => (
                            <PageIndicator
                                {...{ index }}
                                currentIndex={Animated.divide(x, width)}
                                key={index}
                            />
                        ))}
                    </View>
                    <Animated.View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            width: slides.length * width,
                            transform: [
                                { translateX: Animated.multiply(x, -1) },
                            ],
                        }}
                    >
                        {slides.map(({ subtitle, description }, index) => (
                            <Subslide
                                key={index}
                                last={index === slides.length - 1}
                                {...{
                                    subtitle,
                                    description,
                                    x,
                                }}
                                buttonOnPress={buttonOnPress(index)}
                            />
                        ))}
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

export default Onboarding;
