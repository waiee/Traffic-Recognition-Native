import {View, Text, Platform, ScrollView} from "react-native";
import React, { useRef, useEffect } from "react";
import {Appbar, Button, Card, Title, Paragraph, List, Divider} from 'react-native-paper';
import styles from "../theme/Styles";
import LottieView from 'lottie-react-native';
import {Colors} from '../theme/Colors'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'menu';

export default function PrivacyAndData({ navigation }) {
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);
    return (
        <ScrollView>
            <Appbar.Header style={styles.header} mode={'small'}>
                <Appbar.BackAction
                    onPress={() => { navigation.navigate('Navmenu');}}
                    title="Go Back"
                    icon={'arrow-left'}/>
                <Appbar.Content title="Privacy and Data"/>
            </Appbar.Header>

            <Card>
                <Card.Content>
                    <Title>Privacy Policies</Title>
                    <Paragraph>Your privacy is important to us.
                        To better protect your privacy we provide this notice explaining our online information practices
                        and the choices you can make about the way your information is collected and used.</Paragraph>
                </Card.Content>
                <Card.Content>
                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                            width: 250,
                            height: 250,
                            alignSelf: 'center',
                            backgroundColor: '#eee',
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require('../../assets/Lottie/Privacy.json')}
                    />
                </Card.Content>

            </Card>
            <View style={styles.privacy_view}>
                <Card>
                    <Card.Content>
                        <Title>We may collect the following information:</Title>
                        <List.Section>
                            <List.Item title={"Name"}/>
                            <List.Item title={"Email-address"}/>
                        </List.Section>
                    </Card.Content>
                    <Divider />
                    <Card.Content style={{backgroundColor: Colors.colors.thirdly}}>
                        <Title>What we do with the information we gather :</Title>
                        <List.Section >
                            <List.Item titleNumberOfLines={2} title ={"We use Name and Email-address to let user login in our app."}/>
                            <List.Item titleNumberOfLines={2} title={"We may sent promotional emails to the users Email-address."}/>
                        </List.Section>
                    </Card.Content>
                    <Divider/>
                    <Card.Content>
                        <Title>What we don't collect or monitor :</Title>
                        <List.Section>
                            <List.Item titleNumberOfLines={2} title ={"We don't record any activity from the camera throughout the Driving session"}/>
                            <List.Item titleNumberOfLines={2} title={"We don't track users activity from the app"}/>
                            <List.Item titleNumberOfLines={2} title={"We don't track users location from the app"}/>
                        </List.Section>
                    </Card.Content>
                </Card>
            </View>
            <Divider />
            <View style={styles.privacy_view}>

            </View>
        </ScrollView>
    );
}