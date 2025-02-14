import React from "react"
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack"
import OnboardingScreen from "../Screens/OnboardingScreen"
import TabsNavigator, {TabsStackParams} from "./TabsNavigation"
import { NavigatorScreenParams } from "@react-navigation/native"
export type RootStackParams = { // định nghĩa danh sách màn hình có trong navigator
    OnboardingScreen: undefined
    TabsStack: NavigatorScreenParams<TabsStackParams>
}

// tạo một navigator với danh sách màn hình được định nghĩa trong RootStackParams
const RootStack= createNativeStackNavigator<RootStackParams>();
// T extends keyof RootStackParams: T phải là 1 trong các màn hình được định nghĩa trong RootStackParams
// NativeStackScreenProps<RootStackParams, T>; dựa vào T lấy các kiểu dữ liệu tương ứng cho RootStackParams
export type RootStackScreenProps<T extends keyof RootStackParams> =NativeStackScreenProps<RootStackParams, T>;
// RootNavigator là một component React trả về một Stack Navigator.
const RootNavigator = () =>{
    return (
        // RootStack.Navigator là một container chứa danh sách các màn hình
        <RootStack.Navigator>
            <RootStack.Screen
                name="OnboardingScreen" // đặt tên cho màn hình
                component={OnboardingScreen} // chỉ định màn hình OnboardingScreen được hiển thị
                options={{headerShown: false}} // Ẩn header (thanh tiêu đề) trên màn hình này
            />
            <RootStack.Screen
                name="TabsStack" // đặt tên cho màn hình
                component={TabsNavigator} // chỉ định màn hình OnboardingScreen được hiển thị
                options={{headerShown: false}} // Ẩn header (thanh tiêu đề) trên màn hình này
            />
        </RootStack.Navigator>
    )
}
// Xuất RootNavigator để có thể sử dụng trong các file khác
export default RootNavigator