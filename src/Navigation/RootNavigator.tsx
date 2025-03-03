import React from "react"
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack"
import OnboardingScreen from "../Screens/OnboardingScreen"
import TabsNavigator, {TabsStackParams} from "./TabsNavigation"
import { NavigatorScreenParams } from "@react-navigation/native"
import ProductDetails from "../Screens/ProductDetails"
import UserAuth from "../Screens/LoginRegisterScreen."
export type  RootStackParamObj  = { // định nghĩa danh sách màn hình có trong navigator
    OnboardingScreen: undefined
    TabsStack: NavigatorScreenParams<TabsStackParams>
    Deals: undefined
    // Cart: undefined
    Cart: {
        _id?: string;
        images?: [string];
        name?: string;
        price?: number;
        oldPrice?: number;
        inStock?: boolean;
        description?: string;
        quantity?: number;
        screenTitle?: string;
    };
    Profile: undefined
    productDetails: {
        _id: string;
        images:[string];
        name: string;
        price: number;
        oldPrice?: number;
        inStock?: boolean;
        color?: string;
        size?: string;
        description?: string;
        quantity: number
    };
    UserLogin: {
        email?: string;
        password?: string;
        confirmPassword?: string;
        firstName?: string;
        lastName?: string;
        mobileNo?: string;
        screenTitle?: string;
    };
}

// tạo một navigator với danh sách màn hình được định nghĩa trong RootStackParams
// const RootStack= createNativeStackNavigator<RootStackParams>();
// export type RootStackScreenProps<T extends keyof RootStackParams> = NativeStackScreenProps<RootStackParams, T>;

const RootStack = createNativeStackNavigator<RootStackParamObj>();
export type RootStackScreenProps<T extends keyof RootStackParamObj> = 
NativeStackScreenProps<RootStackParamObj, T>;
const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
            name = "OnboardingScreen"
            component = {OnboardingScreen}
            options= {{ headerShown: false}}
            />
            <RootStack.Screen
                name="TabsStack"
                component={TabsNavigator}
                options={{headerShown: false}}
            />
            <RootStack.Screen name="productDetails" component={ProductDetails} options={{ headerShown: false}}/>
            <RootStack.Screen name="UserLogin" component={UserAuth} options={{ headerShown: false}}/>
            
        </RootStack.Navigator>
    )
}
// T extends keyof RootStackParams: T phải là 1 trong các màn hình được định nghĩa trong RootStackParams
// NativeStackScreenProps<RootStackParams, T>; dựa vào T lấy các kiểu dữ liệu tương ứng cho RootStackParams
// export type RootStackScreenProps<T extends keyof RootStackParams> =NativeStackScreenProps<RootStackParams, T>;
// // RootNavigator là một component React trả về một Stack Navigator.
// const RootNavigator = () =>{
//     return (
//         // RootStack.Navigator là một container chứa danh sách các màn hình
//         <RootStack.Navigator>
//             <RootStack.Screen
//                 name="OnboardingScreen" // đặt tên cho màn hình
//                 component={OnboardingScreen} // chỉ định màn hình OnboardingScreen được hiển thị
//                 options={{headerShown: false}} // Ẩn header (thanh tiêu đề) trên màn hình này
//             />
//             <RootStack.Screen
//                 name="TabsStack" // đặt tên cho màn hình
//                 component={TabsNavigator} // chỉ định màn hình OnboardingScreen được hiển thị
//                 options={{headerShown: false}} // Ẩn header (thanh tiêu đề) trên màn hình này
//             />
//         </RootStack.Navigator>
//     )
// }
// Xuất RootNavigator để có thể sử dụng trong các file khác
export default RootNavigator