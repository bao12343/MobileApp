import {View, Text, useWindowDimensions, StyleSheet} from "react-native"
import React from "react"
import Animated, {Extrapolation, interpolate, useAnimatedStyle, interpolateColor} from 'react-native-reanimated'
import OnboardingDots from "./OnboardingDots"
import { OnboardingPaginationParams } from "../../TypesCheck/OnboardingTypesCheck"

type Props = {}

const OnboardingPagination = ({item, x}: OnboardingPaginationParams)=> {
    return (
        <View style = {sty.paginationContainer}>
            {item.map((_, index)=> {
                return<OnboardingDots index={index} x={x} key={index}/>
            })}
        </View>
    )
}
export default OnboardingPagination

const sty = StyleSheet.create({
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 40
    }
})