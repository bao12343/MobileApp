import {View, Image, Text, Platform, ScrollView, SectionList, Dimensions, Pressable, Alert, SafeAreaView, ImageBackground} from 'react-native'
import React, { useState } from 'react'
import { RootStackParamObj, RootStackScreenProps } from '../Navigation/RootNavigator'
import {HeadersComponent} from '../Components/HeaderComponents/HeadersComponent'
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { CartState } from "../TypesCheck/productCartTypes";
// import { ProductListParams } from "../TypesCheck/HomeProps";
import { addToCart } from "../redux/CartReducer";
import { DisplayMessage } from "../Components/DisplayMessage";
import { useSelector, useDispatch } from "react-redux";



const {width} = Dimensions.get("window");
const height: number = (width*220)/220



const ProductDetails = ({ navigation, route }: RootStackScreenProps<"productDetails">) => {
    const { _id, images, name, price, oldPrice, inStock, color, size, description, quantity} =route.params;

    const goToPreviousScreen = () => {
        if (navigation.canGoBack()){
            console.log("chuyen ve trang truoc.");
            navigation.goBack();
        }else{
            console.log("khong the quay lai, chuyen ve trang Onboarding");
            navigation.navigate("OnboardingScreen");
        }
    }

    const gotoCartScreen = () => {
        if (cart.length === 0) {
            setMessage("Giỏ hàng đang trống! Vui lòng thêm món ăn để tiếp tục");
        } else {
            // navigation.navigate("Cart", {});
            // navigation.navigate("TabsStack", {screen: "Cart"});
            navigation.navigate("TabsStack", { screen: "Cart", params: {} });

        }
        setDisplayMessage(true);
        setTimeout(() => setDisplayMessage(false), 3000);
    };
    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);
    const [message, setMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const productItemObj: ProductListParams = route.params as ProductListParams;

    const addItemToCart = (ProductItemObj: ProductListParams) => {
        if (ProductItemObj.quantity < 1) {
            setMessage("Món ăn đã hết hàng");
        } else {
            const findItem = cart.find((product) => product._id === _id);
            setMessage(findItem ? "Món ăn đã được thêm vào giỏ hàng" : "Món ăn đã thêm thành công");
            if (!findItem) {
                setAddedToCart(!addedToCart);
                dispatch(addToCart(ProductItemObj));
            }
        }
        setDisplayMessage(true);
        setTimeout(() => setDisplayMessage(false), 3000);
    };


    return(
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0, flex: 1, backgroundColor: "#000" }}>
            {displayMessage && <DisplayMessage message={message} visible={()=>setDisplayMessage(!displayMessage)} />}
        <HeadersComponent gotoCartScreen ={gotoCartScreen} goToPrevious={goToPreviousScreen} />
        <ScrollView style={{ backgroundColor: "pink"}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground style={{ width, height, marginTop: 25}}>

                    <View style={{padding: 3, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
                        <View style={{
                            width: 40, height: 40, borderRadius: 20, backgroundColor: "#C60C30",
                            flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}
                        >
                            <Text style={{ color: "yellow", textAlign: "center", fontWeight: "600", fontSize: 12}}>
                            {oldPrice ? ((1- price / oldPrice) * 100).toFixed(1) : 50}% off</Text>
                        </View>
                        <View style={{
                            width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0",
                            flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}>
                            <MaterialCommunityIcons name='share-variant' size={25} color="green" />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 20}}>
                        <Image style={{ width: 300, height: 300, resizeMode:"contain"}}
                        source={{uri: images[0] }} />
                    </View>
                    <View style={{
                        width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0",
                            flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "auto", marginBottom: 1000, marginLeft: 20,
                    }}>
                        <AntDesign style={{ paddingLeft:0, paddingTop: 2}} name='heart' size={25} color="grey" />
                    </View>
                </ImageBackground>
                </ScrollView>

            <View style={{ backgroundColor: "#fff", borderWidth: 7, borderColor: "#fff", marginTop: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: "600" }}>{name}</Text>
                    {/* <Text style={{ fontSize: 15, fontWeight: "600", marginTop: 6 }}>{price}&#8363;</Text> */}
                    <Text style={{ fontSize: 15, fontWeight: "600", marginTop: 6 }}>
                        {price.toLocaleString("vi-VN")}&#8363;
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: "600", marginTop: 6, color: "green" }}>
                        {quantity !== 0 ? "Còn món ăn" : "Hết món ăn"}
                    </Text>
                    <Text style={{ height: 1, borderColor: "D0D0D0", borderWidth: 1 }} />

                    <View style={{ marginTop: 30, marginHorizontal: 6 }}>
                        <Text style={{ color: "grey", fontSize: 15, fontWeight: "bold" }}>Giao hàng</Text>
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 7, borderColor: "#fff" }}>
                        <Text style={{ color: "#000" }}>Món ăn có sẵn để giao</Text>
                        <View style={{ flexDirection: "row", marginVertical: 5 }}>
                            <Ionicons name='location' size={24} color="black" />
                            <Text style={{ fontSize: 13, fontWeight: "bold" }}>Món ăn được giao bởi công ty vận chuyển Tài J97</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 30, marginHorizontal: 6 }}>
                        <Text style={{ fontSize: 13, color: "grey", fontWeight: "500" }}>Chi tiết món ăn</Text>
                    </View>

                    <View style={{ backgroundColor: "#fff", borderWidth: 7, borderColor: "#fff" }}>
                        <Text style={{ color: "grey", fontWeight: "500" }}>Mô tả</Text>
                        <Text style={{ color: "#000", fontSize: 15, fontWeight: "500", marginVertical: 2 }}>{description}</Text>
                    </View>
                </View>
                
        </ScrollView>
        {/* <View style={{
            backgroundColor: 'white',
            paddingBottom: 0,
        }}>
            <Pressable style={{
                backgroundColor: "green",
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                margin: 10,
            }}
                onPress={()=>Alert.alert("Add to cart", "Product add to cart successfully.")}
                >
                    <Text style={{color: 'yellow', fontSize: 20,fontWeight: 'bold'}}>Add to cart</Text>
            </Pressable>
        </View> */}

        <View style={{ backgroundColor: "white" }}>
                <Pressable
                    onPress={() => addItemToCart(productItemObj)}
                    style={{
                        backgroundColor: "#FFC72C", padding: 10, justifyContent: "center",
                        alignItems: "center", marginHorizontal: 7, marginVertical: 5
                    }}
                >
                    {addedToCart ? (
                        <View>
                            <Text style={{ color: "red", fontWeight: "bold", fontSize: 20 }}>Thêm món ăn vào giỏ hàng</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={{ color: "green", fontWeight: "bold", fontSize: 20 }}>Thêm món ăn vào giỏ hàng</Text>
                        </View>
                    )}

                </Pressable>

            </View>
    </SafeAreaView>
    
                );
            }
    export default ProductDetails



// import { View, Text, Button } from "react-native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamObj } from "../Navigation/RootNavigator"; // Import đúng file khai báo type

// // Định nghĩa kiểu Props
// type Props = NativeStackScreenProps<RootStackParamObj, "productDetails">;

// const ProductDetails: React.FC<Props> = ({ navigation, route }) => {
//     const { _id, images, name, price, oldPrice, inStock, color, size, description, quantity } = route.params;

//     const gotoCartScreen = () => {
//         navigation.navigate("Cart");
//     };

//     const goToPreviousScreen = () => {
//         if (navigation.canGoBack()) {
//             console.log("Chuyển về trang trước.");
//             navigation.goBack();
//         } else {
//             console.log("Không thể quay lại, chuyển về trang Onboarding.");
//             navigation.navigate("OnboardingScreen");
//         }
//     };

//     return (
//         <View style={{ flex: 1, padding: 20 }}>
//             <Text style={{ fontSize: 24, fontWeight: "bold" }}>{name}</Text>
//             <Text>Giá: {price}đ</Text>
//             <Text>Giá cũ: {oldPrice || "Không có"}</Text>
//             <Text>Tình trạng: {inStock ? "Còn hàng" : "Hết hàng"}</Text>
//             <Text>Màu sắc: {color || "Không có"}</Text>
//             <Text>Kích thước: {size || "Không có"}</Text>
//             <Text>Mô tả: {description || "Không có mô tả"}</Text>

//             <Button title="Thêm vào giỏ hàng" onPress={gotoCartScreen} />
//             <Button title="Quay lại" onPress={goToPreviousScreen} />
//         </View>
//     );
// };

// export default ProductDetails;


// import { View, Image, Text, Platform, ScrollView, SectionList, Dimensions, Pressable, Alert, SafeAreaView, ImageBackground } from 'react-native';
// import React from 'react';
// import { RootStackParamObj, RootStackScreenProps } from '../Navigation/RootNavigator';
// import { HeadersComponent } from '../Components/HeaderComponents/HeadersComponent';
// import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ProductListParams } from './../TypesCheck/HomeProps';

// const { width, height } = Dimensions.get("window");

// const ProductDetails = ({ navigation, route }: RootStackScreenProps<"productDetails">) => {
//     const { _id, images, name, price, oldPrice, inStock, color, size, description, quantity } = route.params;

//     const gotoCartScreen = () => {
//         navigation.navigate("Cart");
//     };

//     const goToPreviousScreen = () => {
//         if (navigation.canGoBack()) {
//             console.log("Chuyển về trang trước.");
//             navigation.goBack();
//         } else {
//             console.log("Không thể quay lại, chuyển về trang Onboarding");
//             navigation.navigate("OnboardingScreen");
//         }
//     };

//     return (
//         <SafeAreaView>
//             <HeadersComponent gotoCartScreen={gotoCartScreen} goToPrevious={goToPreviousScreen} />
//             <ScrollView style={{ backgroundColor: "pink" }}>
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                     <ImageBackground 
//                         source={{ uri: images?.[0] || 'https://via.placeholder.com/300' }} 
//                         style={{ width, height, marginTop: 25 }}
//                     >
//                         <View style={{ padding: 3, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
//                             <View style={{
//                                 width: 40, height: 40, borderRadius: 20, backgroundColor: "#C60C30",
//                                 flexDirection: "row", justifyContent: "center", alignItems: "center"
//                             }}>
//                                 <Text style={{ color: "yellow", textAlign: "center", fontWeight: "600", fontSize: 12 }}>
//                                     {oldPrice ? ((1 - price / oldPrice) * 100).toFixed(1) : 0}% off
//                                 </Text>
//                             </View>
//                             <View style={{
//                                 width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0",
//                                 flexDirection: "row", justifyContent: "center", alignItems: "center"
//                             }}>
//                                 <MaterialCommunityIcons name='share-variant' size={25} color="green" />
//                             </View>
//                         </View>

//                         <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 20 }}>
//                             <Image 
//                                 style={{ width: 300, height: 300, resizeMode: "contain" }}
//                                 source={{ uri: images?.[0] || 'https://via.placeholder.com/300' }} 
//                             />
//                         </View>

//                         <View style={{
//                             width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0",
//                             flexDirection: "row", justifyContent: "center", alignItems: "center",
//                             marginTop: "auto", marginBottom: 50, marginLeft: 20
//                         }}>
//                             <AntDesign style={{ paddingLeft: 0, paddingTop: 2 }} name='heart' size={25} color="grey" />
//                         </View>
//                     </ImageBackground>
//                 </ScrollView>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default ProductDetails;

