import React, {useEffect, useState} from 'react'
import {KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import {Button, Text, TextInput} from 'react-native-paper'
import styles from '../theme/Styles';
import {Colors} from '../theme/Colors'
import {auth} from '../../firebase'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home');
                setEmail('');
                setPassword('');
                navigation.reset({
                    index: 0,
                    routes: [{name: "Home"}],
                });
            }
        })
    },[])
    const onLoginPressed = () => {
        auth.signInWithEmailAndPassword(email,password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert(error.message));
    }


    return (
        <KeyboardAvoidingView style={styles.view} behavior={"padding"}>
            {/*<Logo />*/}
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
                    <TextInput
                        label="Password"
                        mode={'outlined'}
                        returnKeyType="done"
                        selectionColor={'black'}
                        activeOutlineColor={Colors.colors.secondary}
                        style={styles.input}
                        color={'white'}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    <View style={styles.forgotPassword}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ResetPassword')}
                        >
                            <Text >Forgot your password?</Text>
                        </TouchableOpacity>
                    </View>
                    <Button mode="contained" style={styles.button}
                            onPress={onLoginPressed}
                    >
                        Login
                    </Button>
                    <View style={styles.row}>
                        <Text>Don’t have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.link}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
