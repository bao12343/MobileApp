// import { View, Text, Pressable, ImageBackground, Image, TouchableOpacity, StyleSheet, ImageBackgroundComponent}from 'react-native';
// import React from 'react';
// import { IProductProps } from '../../TypesCheck/ProductTypes';


// // const sty = (width?: number, marginHorizontal?: number, marginBottom?: number) =>
// //     StyleSheet.create({
// //         pCardContainer: {
// //             width: width || 100,
// //             marginHorizontal: marginHorizontal || 5,
// //             marginBottom: marginBottom || 10,
// //         },
// //     });

// // const styl = (height?: number) =>
// //     StyleSheet.create({
// //         imageBg: {
// //             height: height || 120,
// //             justifyContent: "center",
// //             alignItems: "center",
// //         },
// //     });


// export const ProductCard = ({ item, productProps }: IProductProps) => {
//     return (
//         <View
//             style={sty(productProps?.width, productProps?.marginHorizontal, productProps?.marginBottom).pCardContainer}
//         >
//             <ImageBackground
//                 source={{ uri: productProps?.imageBg }}
//                 style={styl(productProps?.height).imageBg}
//                 imageStyle={{ borderRadius: 6 }}
//             >
//                 <Pressable key={item._id} onPress={productProps?.onPress} style={{ alignItems: "center" }}>
//                     <Image
//                         source={{ uri: item?.images[0] }}
//                         style={{
//                             resizeMode: productProps?.resizeMode,
//                             height: "100%",
//                             width: 70,
//                         }}
//                     />
//                 </Pressable>
//             </ImageBackground>
//             <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "500", marginBottom: 5}}>{item?.name}</Text>
//             {productProps?.percentageWidth !== undefined &&
//             <>
//                 <View style={{marginTop: 12}}>
//                     <Text style={{ fontSize: 12}}>{item?.quantity} items left</Text>
//                 </View>
//                 <View style={sty().progressBarContainer}>
//                     {/* <View style={stt(productProps?.percentageWidth ? 0 : 1).progressBar} /> */}
//                     <View style={sst(productProps?.percentageWidth ?? 1).progressBar} />

//             </View>
//          </>   
//         }
//     </View>   
//     )
// }

// const sty = (width?: number, marginHorizontal?: number, marginBottom?:number, percentageWidth?:number) => ({
//     pCardContainer: {
//         width,
//         marginHorizontal,
//         borderWidth: 1,
//         borderColor: "grey",
//         borderRadius: 10,
//         marginBottom,
//         backgroundColor:"white"
//     },
//     progressBarContainer:{
//         width: 100,
//         height: 6,
//         backgroundColor: "silver",
//         borderRadius: 99,
//         marginTop: 7,
//     },
// })

// const styl = (height?: number) => ({
//     imageBg: {
//         height,
//         borderRadius: 10,
//     },
// })

// const sst = (percentageWidth?: number) => ({
//     progressBar: {
//         width: percentageWidth,
//         backgroudColor:"purple",
//         borderRadius: 99,
//         height: 6,
//     },
// })


import { View, Text, Pressable, ImageBackground, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { IProductProps } from "../../TypesCheck/ProductTypes";

export const ProductCard = ({ item, productProps, pStyleProps }: IProductProps) => {
    return (
        <View style={{ alignItems: "center" }}>
            <Pressable style={st.imageContainer} key={item._id} onPress={productProps?.onPress}>
                {productProps?.imageBg ? (
                    <ImageBackground
                        source={{ uri: productProps.imageBg }}
                        style={styl(pStyleProps?.height).imageBg}
                    >
                        <Image
                            source={{ uri: item?.images[0] }}
                            style={sty(pStyleProps?.width, pStyleProps?.height, pStyleProps?.radius).imgStyleProps}
                            resizeMode={pStyleProps?.resizeMode}
                        />
                    </ImageBackground>
                ) : (
                    <Image
                        source={{ uri: item?.images[0] }}
                        style={sty(pStyleProps?.width, pStyleProps?.height, pStyleProps?.radius).imgStyleProps}
                        resizeMode={pStyleProps?.resizeMode}
                    />
                )}
            </Pressable>
            <Text style={st.productName}>{item?.name}</Text>
        </View>
    );
};

const st = StyleSheet.create({
    imageContainer: {
        borderRadius: 50,
        padding: 3,
    },
    productName: {
        fontSize: 10,
        fontWeight: "bold",
        marginTop: 5,
    },
});

const styl = (height?: number) => ({
    imageBg: {
        height,
        borderRadius: 11,
    },
});

const sty = (width?: number, height?: number, radius?: number) => ({
    imgStyleProps: {
        width,
        height,
        borderRadius: radius,
    },
});

