import { View, Text, Platform,ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback }  from 'react'
import { TabsStackScreenProps } from '../Navigation/TabsNavigation'
import { setStatusBarBackgroundColor } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeadersComponent} from '../Components/HeaderComponents/HeadersComponent'
import ImageSlider from './../Components/HomeScreenComponents/ImageSlider';
import { ProductListParams } from '../TypesCheck/HomeProps'
import { CategoryCard } from '../Components/HomeScreenComponents/CategoryCard'
import { getCategory } from '../../apiMongoDB/Controllers/CategotyControllers'
import { Image } from 'react-native';
import {fetchCategories} from '../MiddeleWares/HomeMiddeWare'
import { useFocusEffect } from '@react-navigation/native'
type Props = {}

const HomeScreen = ({navigation, route}: TabsStackScreenProps<"Home">)=>{
    const gotoCartScreen = () => { 
        navigation.navigate("Cart")
    }
    const sliderImages = [
        "https://vinhpici.vn/wp-content/uploads/anh-game-Dau-Truong-Chan-Ly.webp",
        "https://api.xedap.vn/products/JAVA/volata-blackchampagne.jpg"
       
    ]
const [getCategory, setGetCategory] = useState<ProductListParams[]>([])
const [activeCat, setActiveCat] = useState<string>("")

useEffect(() => {
    fetchCategories({ setGetCategory});
}, [])

useFocusEffect(
    useCallback(() =>{
        fetchCategories({ setGetCategory});
    }, [])
);

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0, flex:1, backgroundColor: "black"}}>
            <HeadersComponent gotoCartScreen={gotoCartScreen}/>
                <ScrollView horizontal showsHorizontalScrollIndicator ={false}
                    style={{ backgroundColor: "#black"}}
                    
                >
                    <ImageSlider images={sliderImages} />
                </ScrollView>
            <View style={{ backgroundColor:"yellow", flex: 1}}>
                <Text>
                    Hello
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
                style={{ marginTop: 4}}
                >
                    {
                        getCategory.map((item, index) => (
                            <CategoryCard
                                item={{"name" : item.name, "images":item.images, _id: item._id}}
                                catStyleProps={{
                                    "height": 50,
                                    "width": 55,
                                    "radius": 20,
                                    "resizeMode": "contain"
                                }}
                                catProps={{
                                    "activeCat": activeCat, "onPress":() => setActiveCat(item._id)
                                }}
                                />
                        ))
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )   
}

export default HomeScreen

