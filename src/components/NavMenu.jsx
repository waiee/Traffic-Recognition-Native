import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View } from "react-native";
import { Drawer, Divider, IconButton } from 'react-native-paper';
import styles from '../theme/Styles'
import {Colors} from '../theme/Colors'
import { auth } from '../../firebase'

const NavMenu = ({navigation}) => {

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate('Login')
            })
            .catch(error =>alert(error.message))
    }
        return(
            <View style={styles.draw_view}>
                <Text style={styles.draw_text}>{auth.currentUser?.displayName}</Text>
                <Drawer.Section style={styles.draw_section}>
                    <Drawer.Item
                        style={styles.drawer_item}
                        icon="home"
                        label="Home"
                        onPress={() => navigation.navigate('Home')}
                    />
                        <Divider />
                    <Drawer.Item
                        style={styles.drawer_item}
                        icon="account"
                        label="My Account"
                        onPress={() => navigation.navigate('AccountSettings')}
                    />
                        <Divider />
                    <Drawer.Item
                        style={styles.drawer_item}
                        icon="key"
                        label="Permissions"
                        onPress={() => navigation.navigate('Permissions')}
                    />
                        <Divider />
                    <Drawer.Item
                        style={styles.drawer_item}
                        icon="lock"
                        label="Privacy and Data"
                        onPress={() => navigation.navigate('PrivacyAndData')}
                    />
                        <Divider />
                    <Drawer.Item
                        style={styles.drawer_item}
                        icon="logout"
                        label="Logout"
                        onPress={handleSignOut}
                    />
                </Drawer.Section>
                <Drawer.Section style={styles.draw_section_opposite}>
                    <IconButton
                        style={styles.icon_button_opposite}
                        icon="arrow-left"
                        iconColor= {Colors.colors.secondary}
                        // mode={'contained'}
                        size={35}
                        onPress={() => navigation.goBack()}
                    />
                </Drawer.Section>
            </View>
        )
}

export default NavMenu;