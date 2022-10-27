import React, { useState, useEffect } from 'react'
import {KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native'
import {Button, Paragraph, Text, TextInput, Portal, Dialog} from 'react-native-paper'
import styles from '../theme/Styles';
import {Colors} from '../theme/Colors'
import { auth } from '../../firebase'

export default function ResetPassword({navigation}){
    const [email, setEmail] = useState('')
    const [showMessage, setShowMessage] = useState(false);

    const hideDialog = () => setShowMessage(false);

    const onResetPressed = () => {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                console.log("Email Sent");
                setShowMessage(true);
            }).catch(error => alert(error.message));
    }
    return(
        <KeyboardAvoidingView style={styles.view} behavior={"padding"}>
            <TouchableWithoutFeedback >
                <View>
                    <TextInput
                        label="Email"
                        mode={'outlined'}
                        selectionColor={'black'}
                        activeOutlineColor={Colors.colors.secondary}
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text >Back to Login </Text>
                    </TouchableOpacity>
                    <Button mode="contained" style={styles.button}
                            onPress={onResetPressed}>
                        Reset Password
                    </Button>
                    <Portal>
                        <Dialog visible={showMessage} onDismiss={hideDialog} style={styles.dialog_view}>
                            <Dialog.Title style={styles.dialog_text}>Reset Password</Dialog.Title>
                            <Dialog.Content >
                                <Paragraph style={styles.dialog_text}>The link to reset password have been sent to your account.</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions >
                                <Button onPress={hideDialog}
                                        buttonColor={Colors.colors.secondary}
                                        mode="contained"
                                        style={styles.button}>Okay</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}