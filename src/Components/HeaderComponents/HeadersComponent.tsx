import { View, Text, StyleSheet, Pressable, TextInput, } from "react-native"
import React, {useState} from "react"
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import {GoBack} from "./GobackButton"
import CartScreen from './../../Screens/CartScreen';


interface IHeaderParams {
    goToPrevious?: () => void;
    search?: () => void;
    cartLength?: number;
    gotoCartScreen?: () => void;
}

export const HeadersComponent = ({ goToPrevious, search, cartLength, gotoCartScreen}: IHeaderParams) => {
    const [searchInput, setSearchInput ] = useState("")
    return(
        <View style={{ backgroundColor: "#000", padding:10, flexDirection:"row", alignItems: "center" }}>
            <GoBack onPress= {goToPrevious} />
            <Pressable style={{
                flexDirection: "row", alignItems: "center", marginHorizontal: 7,
                gap: 10, backgroundColor: "white", borderRadius: 10, height: 38, flex: 1
            }}>
            <Pressable style={{ padding: 10}} onPress={search}>
                <AntDesign name= "search1" size={20} color={"blue"} />
            </Pressable>
            <TextInput value={searchInput} onChangeText={setSearchInput} placeholder= "search Items..."/>
            </Pressable>
            {/* <Pressable onPress={gotoCartScreen}>
                <View style= {styles.cartNum}>
                    <Text style= {{ color: "pink"}}>
                        {cartLength}
                    </Text>
                </View>
                <MaterialIcons name="shopping-cart" size={24} color={"white"} style={{ padding:5, marginTop: 3}}/>
            </Pressable> */}
            <Pressable onPress={gotoCartScreen}>
                        <View style={styles.cartNum}>
                            <Text style={styles.cartNumText}>{cartLength}</Text>
                        </View>
                        <MaterialIcons name="shopping-cart" size={24} color="white" style={styles.cartIcon}/>
             </Pressable>


        </View>
    )
}
const styles = StyleSheet.create ({
    cartNum: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "yellow",
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    cartNumText: {
        color: "#fff",
    },
    cartIcon: {
        padding: 5,
        marginTop: 3,
    },
})
