import {View, Text, Platform, BackHandler, Dimensions, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {Appbar, Button, Card, Title, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';
import {Colors} from '../theme/Colors'
import styles from "../theme/Styles"
import SimpleLoader from "../components/SimpleLoader"
import {auth} from '../../firebase'
import Charts from "../components/Chart";
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'menu';

export default function Home({ navigation }) {
    // BackHandler.addEventListener('hardwareBackPress', function () {
    //     BackHandler.exitApp();
    // });
    const screenWidth = Dimensions.get("window").width;
    const [visible, setVisible] = React.useState(false);
    const [show, setShow] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);


    useEffect(() => {
        setTimeout(() => setShow(true), 2000);
    },[]);

    const cameraOn = () =>{
        hideDialog();
        navigation.navigate('TrafficCamera');
    }

    return (
        <View>
            <Appbar.Header style={styles.header}  mode={'small'} color={Colors.colors.primary}>
                <Appbar.Action
                    title="Open drawer"
                    onPress={() => navigation.navigate('Navmenu')}
                    icon={MORE_ICON}/>
                <Appbar.Content title="Home"/>
            </Appbar.Header>

            <View style={styles.home_view}>
                <Card>
                    <Card.Content>
                        <Title>Welcome, {auth.currentUser?.displayName}</Title>
                        <Paragraph>Traffic Recognition assistance is your assistance to help you drive safely and carefully, Just mount your Phone on Phone holder and start driving session, The app will tell you the color when you capture the picture of the traffic light using the camera. </Paragraph>
                    </Card.Content>

                    <Card.Content>
                        <Title>Your weekly performance for following the correct signal</Title>
                        <Charts/>
                    </Card.Content>

                    <Card.Actions>
                        <Button style={styles.button}
                                buttonColor={Colors.colors.secondary}
                                mode="contained"
                                onPress={showDialog}>Start Driving</Button>
                    </Card.Actions>
                </Card>
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog_view}>
                    <Dialog.Title style={styles.dialog_text}>When light turns green</Dialog.Title>
                    <Dialog.Content>
                        <Image style={styles.image}
                            source={require('../../assets/pictures/Go.png')}
                        />
                    </Dialog.Content>
                    <Dialog.Title style={styles.dialog_text}>When light turns red</Dialog.Title>
                    <Dialog.Content>
                        <Image style={styles.image}
                            source={require('../../assets/pictures/Stop.png')}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button buttonColor={Colors.colors.secondary}
                                mode="contained"
                                onPress={cameraOn}>Start Session</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    );
}