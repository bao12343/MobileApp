import {View, Text, useWindowDimensions, StyleSheet,  ViewToken} from "react-native"
import React, {useState} from "react"
import Animated, {Extrapolation, interpolate, useAnimatedStyle, useSharedValue,
    useAnimatedRef,
    useAnimatedScrollHandler, 
} from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import { RootStackScreenProps } from "../Navigation/RootNavigator"
import { OnboardingPrograms } from "../TypesCheck/OnboardingTypesCheck"
import { OnboardingData } from "../Data/EcommerceAppData"
import OnboardingItems from "../Components/OnboardingComponents/OnboardingItems"
import OnboardingPagination from "../Components/OnboardingComponents/OnboardingPagination"
import OnboardingButton from "../Components/OnboardingComponents/OnboardingButton"
import { FlatList } from "react-native-reanimated/lib/typescript/Animated"




// Đây là một object rỗng, nghĩa là component OnboardingScreen không nhận props nào cả.
type Props={}

// //chỉ định kiểu dữ liệu cho props (trong trường hợp này props đang rỗng).
// const OnboardingScreen = (props: Props) => {
//     return (
//         <View style={{marginTop: 40}}>
//             <Text style={{fontSize: 20}}>OnboardingScreen ...</Text>
//         </View>
//     )
// }

const OnboardingScreen =({navigation, route}: RootStackScreenProps<"OnboardingScreen">) =>{
    const [onboardingItems, setOnBoardingItems]= useState<OnboardingPrograms[]>(OnboardingData)
    const x = useSharedValue(0)
    const flatListRef = useAnimatedRef<FlatList<OnboardingPrograms>>()
    const flatListIndex = useSharedValue(0)
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x
        }
    })
    const onViewableItemsChanged =({ 
        viewableItems, 
    }:{
            viewableItems:ViewToken[]
        })=>{
            if(viewableItems[0].index !== null){
                flatListIndex.value = viewableItems[0].index
            }
        }
    return (
        <View style ={{flex: 1}}>
            <Animated.FlatList
                ref={flatListRef}
                onScroll={onScrollHandler}
                data={onboardingItems}
                renderItem={({item,index})=>(
                    <OnboardingItems item={item} index= {index} x={x} />
                )}
                keyExtractor={item => item._id}
                scrollEventThrottle={17}
                horizontal
                showsHorizontalScrollIndicator= {false}
                pagingEnabled
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    minimumViewTime: 300,
                    viewAreaCoveragePercentThreshold: 10
                }}
            />
            <View
                style={{
                    position: "absolute", bottom: 20, left: 0, flexDirection: "row", justifyContent:"space-between",
                    alignItems: "center", marginHorizontal: 30, paddingVertical: 30
                }}
            >
                <OnboardingPagination item={onboardingItems} x={x}/>
                <OnboardingButton
                    x={x} itemLength={onboardingItems.length}
                    // flatListRef= {flatListRef}
                    flatListRef = {flatListRef}
                    flatListIndex = {flatListIndex}
                />
            </View>
        </View>
    )
}
export default OnboardingScreen




