import {StyleSheet} from "react-native";
import {Colors} from './Colors'

export default StyleSheet.create({
    //--------------------General Styling------------------------------
    view:{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%',
        marginTop: 120,
        paddingTop: 25,
        paddingBottom: 20,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    text: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        fontSize: 18,
        fontWeight: '450',
    },
    button: {
        margin: 15,
        backgroundColor: Colors.colors.secondary,
    },
    image: {
        width: '100%',
        height: 150,
    },
    //-----------------------------------------------------------------
    loader_view: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    //--------------------Home Styles----------------------------------
    home_view: {
        height: '100%',
        paddingTop: 25,
        paddingBottom: 20,
        paddingRight: 10,
        paddingLeft: 10,
    },
    //-----------------------------------------------------------------
    //--------------------NavMenu Styles-------------------------------
    draw_view:{
        height: '100%',
        width: '100%',
        backgroundColor: Colors.colors.secondary,
    },
    draw_section:{
        marginTop: 150,
        paddingTop: 20,
        height: '100%',
        width: '85%',
        backgroundColor: Colors.colors.primary,
    },
    draw_section_opposite:{
        position: 'absolute',
        height: '100%',
        width: '15%',
        backgroundColor: Colors.colors.thirdly,
        right: 0,
    },
    drawer_item: {
        padding: 10,
        margin: 20,
    },
    draw_text:{
        position: 'absolute',
        top: 100,
        color: Colors.colors.primary,
        left: 15,
        fontSize: 20,
        fontWeight: '600',
        wrap: true,
    },
    icon_button_opposite: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    //-------------------------------------------------------------------
    //-----------------------Header Styles-------------------------------
    header:{
        width: '100%',
        backgroundColor: Colors.colors.primary,
    },
    //----------------------------------------------------------------------
    //---------------------Login&SignUp Styles------------------------------
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 4,
    },
    input: {
        marginHorizontal: 5,
        marginVertical: 15,
        backgroundColor: Colors.colors.thirdly,
        fontColor: 'white',
    },
    forgot: {
        fontSize: 15,
        color: Colors.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: Colors.colors.secondary,
    },
    //----------------------------------------------------------------------
    //--------------------Permission Styles-------------------------------
    permissions_view:{
        padding: 20,
        marginVertical: 10,
        width: '100%',
    },
    permissions_text:{
        width: '80%',
        fontSize: 18,
        fontWeight: "normal",
    },
    permissions_switch: {
        width: '20%',
        position: 'absolute',
        right: 5,
    },
    //----------------------------------------------------------------------
    //-----------------------Account Setting Styles-------------------------
    account_view: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 20,
        width: '100%',
    },
    //----------------------------------------------------------------------
    //-----------------------Privacy View Styles----------------------------
    privacy_view: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
        width: '100%',
    },
    //----------------------------------------------------------------------
    //-----------------------Alert Dialog Styles----------------------------
    dialog_view:{
        backgroundColor: Colors.colors.thirdly,
    },
    dialog_text: {
        color: 'black',
        fontSize: 18,
        fontWeight: '450',
    }
})