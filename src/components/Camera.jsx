import { Camera, CameraType } from 'expo-camera';
import React, {useState, useRef, useEffect} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import style1 from '../theme/Styles'
import {Appbar, Dialog, IconButton, Portal, Button} from "react-native-paper";
import {Colors} from "../theme/Colors";
import * as Speech from 'expo-speech';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import getAuth from '../../token'
import LottieView from "lottie-react-native";
import FormData from 'form-data';
import axios from "axios";

const BOTTOM_APPBAR_HEIGHT = 50;

export default function TrafficCamera({navigation},props) {
    const { bottom } = useSafeAreaInsets();
    const cameraRef = React.createRef()
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [token, setToken] = useState(null);
    const [visible, setVisible] = React.useState(false);
    const [visibleGo, setVisibleGo] = React.useState(false);
    const [visibleStop, setVisibleStop] = React.useState(false);
    const [photo, setPhoto] = useState(null);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const showDialogGo = () => setVisibleGo(true);
    const hideDialogGo = () => setVisibleGo(false);
    const showDialogStop = () => setVisibleStop(true);
    const hideDialogStop = () => setVisibleStop(false);

    let ans = "";

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to show the camera
                </Text>
                <Button style={style1.button}
                        buttonColor={Colors.colors.secondary}
                        mode="contained"
                        onPress={requestPermission}
                        >Grant Permission</Button>
            </View>
        );
    }
    function toggleCameraType() {
        setType((current) => (
            current === CameraType.back ? CameraType.front : CameraType.back
        ));
    }

    const Speak = () =>{
        // if(Speech){
        if(ans==="go"){
            const Go = 'Go';
            Speech.speak(Go);
        }else if(ans==="stop"){
            const Stop = 'Stop';
            Speech.speak(Stop);
        }else{
            const Error = 'Unable to recognize at the moment, Please try again letter';
            Speech.speak(Error);
        }
    }
    // const modelStart = () =>{
    //     setToken(getAuth);
    //     // console.log(token);
    // }
    const clickPicture = async ()=>{
        if(cameraRef.current){
            const option = { quality: 1, base64: true, exif:false };
            let pic = await cameraRef.current.takePictureAsync(option);
            setPhoto(pic);

            if(photo){
                const data = await new FormData();

                data.append('images', {
                    uri: photo.uri,
                    name: photo.uri.split('/').pop(), //split the uri at / and get the last element of the resulting array which actually is the name with the image extention (e.g, abc.jpg)
                    type: 'image/jpg' // type needs to be modified. keep reading
                })

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'X-Apig-Appcode': '24028444b26e481bbc0a1236edb23344809d46f9fcec4acfab7fb8a276c9c8e3',
                        'content-type': 'multipart/form-data',
                    },
                    body: data,
                    redirect: 'follow'
                };

                await fetch("https://01516f373f434921a874bf502a986a58.apig.ap-southeast-3.huaweicloudapis.com/v1/infers/70cc6118-c616-4cb0-acd8-4d2442570deb",
                    requestOptions)
                    .then(response => response.text())
                    .then(function (result){
                        console.log(result);
                        console.log(result.includes('go'));
                        if(result.includes('go')===true){
                            ans="go";
                        }
                        else if(result.includes('stop')===true){
                            ans="stop";
                        }
                        else{
                            ans= "Recognition failed"
                        }
                        console.log(ans)

                    })
                    .catch(error => console.log('error', error));
                // try {
                //     module.exports = typeof self == 'object' ? self.FormData : window.FormData;
                //     await axios.post("https://2fec676ce4e447d0980abfbeb404b0a3.apig.ap-southeast-3.huaweicloudapis.com/v1/infers/70cc6118-c616-4cb0-acd8-4d2442570deb"
                //         , data
                //         , {
                //             headers: {
                //             'X-Auth-Token': token,
                //             'content-type': 'multipart/form-data',
                //         }})
                //         .then(function (response) {
                //             console.log(JSON.stringify(response.headers));
                //         })
                //         .catch(function (error) {
                //             console.log(error);
                //         });
                // } catch(error) {
                //     console.log(error)
                // }

            }
            if(ans==="go"){
                showDialogGo();
            }
            else if(ans==="stop"){
                showDialogStop();
            }
            else if (ans==="Recognition failed"){
                showDialog();
            }
           ans = ""
        }
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera}
                    type={type}
                    ref={cameraRef}
                    // onCameraReady={modelStart}
                    ratio={'16:9'}>
                <View style={styles.buttonContainer}>
                    <Appbar.Header style={style1.header} mode={'small'}>
                        <Appbar.BackAction
                            onPress={() => { navigation.navigate('Home');}}
                            title="Go Back"
                            icon={'arrow-left'}/>
                        <Appbar.Content title="Camera"/>
                        <Appbar.Action
                            title={"Flip Camera"}
                            icon={'camera-flip'}
                            onPress={toggleCameraType}
                            />
                        <Appbar.Action
                            icon="speaker"
                            onPress={Speak}
                            />
                    </Appbar.Header>
                    <Appbar
                        style={styles.bottom}
                        safeAreaInsets={{ bottom }}
                    >
                        <IconButton
                            style={styles.button}
                            icon="camera"
                            mode={"contained-tonal"}
                            iconColor={Colors.colors.text}
                            containerColor={Colors.colors.thirdly}
                            size={50}
                            onPress={clickPicture}
                        />
                    </Appbar>

                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog} style={style1.dialog_view}>
                            <Dialog.Title style={style1.dialog_text}>There appears to be something wrong with the Recognition, Please try again later.</Dialog.Title>
                            <Dialog.Actions>
                                <Button buttonColor={Colors.colors.secondary}
                                        mode="contained"
                                        onPress={hideDialog}>Okay</Button>
                            </Dialog.Actions>
                        </Dialog>
                        <Dialog visible={visibleGo} onDismiss={hideDialogGo} style={style1.dialog_view}>
                            <View style={styles.loader_view}>
                                <LottieView
                                    autoPlay
                                    style={{
                                        width: 150,
                                        height: 150,
                                    }}
                                    source={require('../../assets/Lottie/Go.json')}
                                />
                            </View>
                            <Dialog.Title style={style1.dialog_text}>The light is Green, please Go.</Dialog.Title>
                            <Dialog.Actions>
                                <Button buttonColor={Colors.colors.secondary}
                                        mode="contained"
                                        onPress={hideDialogGo}>Okay</Button>
                            </Dialog.Actions>
                        </Dialog>
                        <Dialog visible={visibleStop} onDismiss={hideDialogStop} style={style1.dialog_view}>
                            <View style={styles.loader_view}>
                                <LottieView
                                    autoPlay
                                    style={{
                                        width: 100,
                                        height: 100,
                                    }}
                                    source={require('../../assets/Lottie/Stop.json')}
                                />
                            </View>
                            <Dialog.Title style={style1.dialog_text}>The light is Red, please Stop.</Dialog.Title>
                            <Dialog.Actions>
                                <Button buttonColor={Colors.colors.secondary}
                                        mode="contained"
                                        onPress={hideDialogStop}>Okay</Button>
                            </Dialog.Actions>
                        </Dialog>
                </Portal>


                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
    },
    bottom: {
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: BOTTOM_APPBAR_HEIGHT,
        backgroundColor: Colors.colors.secondary,
        flex:1,
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 15,
        zIndex: 2,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    loader_view: {
        flex:1,
        padding: 35,
        margin: 5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
});