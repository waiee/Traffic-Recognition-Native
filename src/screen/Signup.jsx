import React, {useEffect, useState} from 'react'
import {KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import {Button, HelperText, Text, TextInput} from 'react-native-paper'
import styles from "../theme/Styles";
import {auth} from "../../firebase";
import {Colors} from "../theme/Colors";


export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(true);
    const [showLengthErrorMessage, setShowLengthErrorMessage] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home');
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                navigation.reset({
                    index: 0,
                    routes: [{name: "Home"}],
                });
            }
        })
    },[])
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
    const onSignUpPressed = () => {
        if(password === confirmPassword && name!=="" && password.length>=6){
            auth.createUserWithEmailAndPassword(email,password)
                .then((res) =>{
                        const userInfo ={
                            displayName: name,
                        };
                    res.user.updateProfile(userInfo)
                    })
                .catch(error => alert(error.message));
        }
    }

    return (
        <KeyboardAvoidingView style={styles.view}>
            <TouchableWithoutFeedback >
                <View>
                    <TextInput
                        label="Name"
                        mode={'outlined'}
                        selectionColor={'black'}
                        activeOutlineColor={Colors.colors.secondary}
                        returnKeyType="next"
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        label="Email"
                        mode={'outlined'}
                        selectionColor={'black'}
                        activeOutlineColor={Colors.colors.secondary}
                        returnKeyType="next"
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />

                    <TextInput
                        label="Password"
                        mode={'outlined'}
                        selectionColor={'black'}
                        activeOutlineColor={Colors.colors.secondary}
                        returnKeyType="done"
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    <TextInput
                        label="Confirm Password"
                        mode={'outlined'}
                        selectionColor={'black'}
                        activeOutlineColor={Colors.colors.secondary}
                        returnKeyType="done"
                        style={styles.input}
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
                        Sign Up
                    </Button>
                    <View style={styles.row}>
                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.link}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback >
        </KeyboardAvoidingView>
    )
}
