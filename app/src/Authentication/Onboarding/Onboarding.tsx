import * as React from "react";
import {
    StyleSheet,
    useWindowDimensions,
    View,
    Animated,
    ScrollView,
    Image,
    Dimensions,
} from "react-native";
import { Slide } from "./Slide";
import { SLIDE_HEIGHT } from "./Slide";
import Subslide from "./Subslide";
import { PageIndicator } from "../../Components";

export const BORDER_RADIUS = 90;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    slider: {
        height: SLIDE_HEIGHT,
        borderBottomRightRadius: 90,
    },
    underlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    picture: {
        borderBottomRightRadius: 90,
        width: width,
        height: (width - BORDER_RADIUS) * 1.7,
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
        color: "#EDBC41",
        image: require("../../../assets/images/2.jpg"),
    },
    {
        title: "Excentric",
        subtitle: "Get pumped up",
        description:
            "We aim to energize your lazy daytime durations and convert you into a productivity powerhousr",
        color: "#233132",
        image: require("../../../assets/images/3.jpg"),
    },
    {
        title: "Funky",
        subtitle: "Feeling Left Out?",
        description:
            "Create your own playlist by selecting curated songs to train the model to your specific needs.",
        color: "#CD6582",
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
                {slides.map(({ image }, index) => {
                    const opacity = x.interpolate({
                        inputRange: [
                            (index - 0.5) * width,
                            index * width,
                            (index + 0.5) * width,
                        ],
                        outputRange: [0, 1, 0],
                    });
                    return (
                        <Animated.View
                            style={[styles.underlay, { opacity }]}
                            key={index}
                        >
                            <Image source={image} style={styles.picture} />
                        </Animated.View>
                    );
                })}

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
