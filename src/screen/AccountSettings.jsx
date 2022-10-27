import {View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from "react-native";
import React,{useState, useEffect} from "react";
import {Appbar, Button, Divider, HelperText, Dialog, Portal, Paragraph, TextInput} from 'react-native-paper';
import styles from "../theme/Styles";
import {auth} from "../../firebase"
import {Colors} from "../theme/Colors";

export default function AccountSettings({ navigation }) {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(true);
    const [showLengthErrorMessage, setShowLengthErrorMessage] = useState(true);
    const [showBlock, setShowBlock] = useState(false);
    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);

    useEffect(() =>{
        if(password.length>=6){
            setShowLengthErrorMessage(false);
        } else{
            setShowLengthErrorMessage(true);
        }
        if(password === confirmPassword && password.length>=6){
            setShowErrorMessage(false);
        } else{
            setShowErrorMessage(true);
        }
    })
    let user = auth.currentUser;
    const onSignUpPressed = () =>{
        if(password === confirmPassword && password.length>=6){
            user.updatePassword(password)
                .then(function(){
                   console.log("update successful");
                })
                .catch(error => alert(error.message));
            setVisible(true);
            setShowBlock(false);
        }
    }

    const showChange = () =>{
        setShowBlock(true);
    }

    return (
        <View >
            <Appbar.Header style={styles.header} mode={'small'}>
                <Appbar.BackAction
                    onPress={() => { navigation.navigate('Navmenu');}}
                    title="Go Back"
                    icon={'arrow-left'}/>
                <Appbar.Content title="My Account"/>
            </Appbar.Header>

            <View style={styles.account_view}>
                <TextInput
                    label="Name"
                    editable={false}
                    returnKeyType="done"
                    style={styles.input}
                    selectionColor={'black'}
                    activeOutlineColor={Colors.colors.secondary}
                    mode={'outlined'}
                    value={auth.currentUser?.displayName}
                />
                <TextInput
                    label="Email"
                    editable={false}
                    returnKeyType="done"
                    style={styles.input}
                    selectionColor={'black'}
                    activeOutlineColor={Colors.colors.secondary}
                    mode={'outlined'}
                    value={auth.currentUser?.email}
                />
            </View>
            <Divider />
            { showBlock ?
            <KeyboardAvoidingView style={styles.account_view} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
                    <View>
                        <TextInput
                            label="Password"
                            returnKeyType="done"
                            style={styles.input}
                            selectionColor={'black'}
                            activeOutlineColor={Colors.colors.secondary}
                            mode={'outlined'}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry
                        />
                        <TextInput
                            label="Confirm Password"
                            returnKeyType="done"
                            style={styles.input}
                            selectionColor={'black'}
                            activeOutlineColor={Colors.colors.secondary}
                            mode={'outlined'}
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry
                        />
                        {showErrorMessage ? <HelperText type="error" >The password doesn't match</HelperText>
                            : <HelperText>The password matching</HelperText>}
                        {showLengthErrorMessage ? <HelperText type="error" >The password should be greater than 6</HelperText>
                            : <HelperText>The password length is correct</HelperText>}
                        <Button
                            mode="contained"
                            onPress={onSignUpPressed}
                            style={styles.button}
                        >
                            Confirm Password
                        </Button>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView> : <View style={styles.account_view}>
                    <Button style={styles.button}
                            mode="contained"
                            onPress={showChange}>Edit Password</Button>
                </View>}
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog_view}>
                    <Dialog.Title style={styles.dialog_text}>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={styles.dialog_text}>Your Password have been changed</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}
                            buttonColor={Colors.colors.secondary}
                            mode="contained"
                        >Okay</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}