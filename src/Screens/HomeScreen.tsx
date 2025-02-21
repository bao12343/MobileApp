import { View, Text, Platform, ScrollView , Pressable, Alert} from 'react-native'
import React, {useRef, useState, useCallback, useEffect} from 'react'
import { TabsStackScreenProps } from '../Navigation/TabsNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeadersComponent } from '../Components/HeaderComponents/HeadersComponent'
import ImageSlider from '../Components/HomeScreenComponents/ImageSlider'
import { ProductListParams } from '../TypesCheck/HomeProps'
import { CategoryCard } from '../Components/HomeScreenComponents/CategoryCard'
import {fetchCategories} from '../MiddeleWares/HomeMiddeWare'
import { useFocusEffect } from '@react-navigation/native'
import {fetchProductsByCatID,} from '../MiddeleWares/HomeMiddeWare'
import { getProductByID } from "./../../apiMongoDB/Controllers/ProductControllers";
type Props = {}

const HomeScreen = ({navigation, route}: TabsStackScreenProps<"Home">)=>{
    const gotoCartScreen = () => {
        navigation.navigate ("Cart")
    }
    const sliderImages = [
        "https://cdn.tgdd.vn/Files/2019/03/07/1153472/chinese-new-year_600x800.jpg",
        "https://cdn.tgdd.vn/Files/2019/03/07/1153472/iphone-food-photography_800x600.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLiWI6uVxxGMoJMkbsWwq_iX52wdk9hbgDcg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkODQzceTZ-Av0HCuB0fBY-KmCj0A9GWNgNA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR72CpuuFyT1NC9kdfelUHeZHe0KP7-xnp7SQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKWfjpRGiJokXqJ9Wkx_EviXfBsInyWzuUHg&s"
    ]
    const bgImg = ""
    const [getCategory, setGetCategory] = useState<ProductListParams[]>([])
    const [getProductsByCatID, setGetProductsByCatID] = useState<
        ProductListParams[]
    >([]);
    const [activeCat, setActiveCat] = useState<string>("")

    useEffect(() => {
        fetchCategories({ setGetCategory});
    }, [])
    useEffect(() => {
        console.log("fetchProductByCatID:", fetchProductsByCatID);
        if (activeCat) {
          fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
        }
      }, [activeCat]);
    
      useFocusEffect(
        useCallback(() => {
          fetchCategories({ setGetCategory });
          if (activeCat) {
            fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
          }
        }, [activeCat])
      );
    
    return (
        <SafeAreaView style ={{paddingTop: Platform.OS === "android" ? 40 : 0 , flex: 1, backgroundColor: "black"}}>
            <HeadersComponent gotoCartScreen = {gotoCartScreen}/>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style={{backgroundColor: "#efg"}}
                
            >
                <ImageSlider images={sliderImages}/>
            </ScrollView>


            <View style={{ backgroundColor:"yellow", flex: 1}}>
            <Text style={{ 
                    fontSize: 20, 
                    fontWeight: "bold", 
                    textAlign: "center", 
                    color: "#6D4C41" 
                }}>
                    Categories
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
                style={{ marginTop: 4}}
                >
                    {
                        getCategory.map((item, index) => (
                            <CategoryCard
                                key={index}
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
            <View
                style={{
                backgroundColor: "pink",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
            }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
          Products from Selected Category
        </Text>
        <Pressable>
          <Text style={{ fontSize: 11, fontWeight: "bold", padding: 10 }}>
            See All
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          borderWidth: 7,
          borderColor: "green",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {getProductsByCatID.length > 0 ? (
            getProductsByCatID.map((item, index) => (
              <CategoryCard
                key={index}
                item={{ name: item.name, images: item.images, _id: item._id }}
                catStyleProps={{
                  height: 100,
                  width: 100,
                  radius: 10,
                  resizeMode: "contain",
                }}
                catProps={{
                  "onPress": () => Alert.alert(item.name), "imageBg": bgImg,
                }}
              />
            ))
          ) : (
            <Text> Không có sản phẩm nào </Text>
          )}
        </ScrollView>
      </View>
        </SafeAreaView>
    )
}

export default HomeScreen