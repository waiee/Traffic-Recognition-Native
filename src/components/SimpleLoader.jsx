import React, {useEffect, useRef} from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import styles from "../theme/Styles"

export default function SimpleLoader(){
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);
    return(
        <View style={styles.loader_view}>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 70,
                    height: 70,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/Lottie/Loader.json')}
            />
        </View>
    )

}