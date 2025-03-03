import react , {useCallback, useEffect, useState, useRef}from "react";
import {View, Text,  ScrollView,  Pressable,  Dimensions, 
    Image, Animated, Easing, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Platform} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';

const width= Dimensions.get("screen").width*2/3+50

interface IUserForm {
    label: string;
    duration?: number;
    labelColor?: string;
    text?: string;
    updateText?: (text: string) => void;
    isPasswordField?: boolean; // Declare the optional prop here
}
export const UserDataForm = ({label, duration, labelColor="black", text, updateText, isPasswordField}: IUserForm) => {

    const [showPassword, setShowPassword] = useState(false);
    // const [isPressed, setIsPressed] = useState(false); // Trạng thái nhấn

    const transY = useRef(new Animated.Value(0)).current;
    const borderWidth = useRef (new Animated.Value(1)).current;

    const transformAnimation = (toValue: number) => {
        Animated.timing(transY, {
            toValue,
            duration: 150,
            useNativeDriver: true,
            easing: Easing.ease
        }).start();
    }
    const animatedBorderWidth = (toValue: number) => {
        Animated.timing(borderWidth, {
            toValue,
            duration: 150,
            useNativeDriver: false,
            easing: Easing.ease
        }).start();
    }


    const onFocusHandler = () => {
        transformAnimation(-13)
        animatedBorderWidth(2)
    }
    const onBlurHandler = () =>{
        if(text) return;
        transformAnimation(0)
        animatedBorderWidth(1)
    }

    const borderColor = borderWidth.interpolate({
        inputRange:[1,2],
        outputRange:["black", "orange"],
        extrapolate: "clamp"
    })

    const labelFontSize = borderWidth.interpolate({
        inputRange:[1,2],
        outputRange:[14, 10],
        extrapolate: "clamp"
    })
    const labelBackgroundColor = borderWidth.interpolate ({
        inputRange:[1,2],
        outputRange:["#fff", "#eee"],
        extrapolate: "clamp"
    })
    const labelPadding = borderWidth.interpolate ({
        inputRange:[1,2],
        outputRange:[4, 0],
        extrapolate: "clamp"
    })
    const labelColorAnimation = borderWidth.interpolate({
        inputRange:[1,2],
        outputRange:["grey", labelColor],
        extrapolate: "clamp"
    })
    const animStyle = {
        transform :[
            {translateY: transY}
        ]
            
        
    }
    // return (
    //     <Animated.View style={[st.container, { borderWidth: borderWidth, borderColor: borderColor }]}>
    //         <Animated.View style={[st.animatedStyle, animStyle]}>
    //             <Animated.Text style={{
    //                 color: labelColorAnimation,
    //                 fontSize: labelFontSize,
    //                 backgroundColor: labelBackgroundColor,
    //                 padding: labelPadding
    //             }}>
    //                 {label}
    //             </Animated.Text>
    //         </Animated.View>
    //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //             <TextInput
    //                 style={st.input}
    //                 value={text}
    //                 onChangeText={updateText}
    //                 editable={true}
    //                 onFocus={onFocusHandler}
    //                 onBlur={onBlurHandler}
    //                 blurOnSubmit
    //                 autoCapitalize={'none'}
    //                 secureTextEntry={!showPassword} // Sử dụng trạng thái để xác định
    //             />
    //             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    //                 <Text><Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="black" /> {/* Biểu tượng con mắt */}</Text>
                    
    //             </TouchableOpacity>
    //         </View>
    //     </Animated.View>
    // );



    // mới nhất
    // return (
    
    //     <Animated.View style={[st.container, { borderWidth: borderWidth, borderColor: borderColor }]}>
    //         <TouchableOpacity
    //             style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
    //             onPress={() => {/* Thực hiện hành động nhấn ở đây */}}
    //         >
    //         <Animated.View style={[st.animatedStyle, animStyle]}>
    //             <Animated.Text
    //                 style={{
    //                     color: labelColorAnimation,
    //                     fontSize: labelFontSize,
    //                     backgroundColor: labelBackgroundColor,
    //                     padding: labelPadding,
    //                 }}
    //             >
    //                 {label}
    //             </Animated.Text>
    //         </Animated.View>
            
    //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //             <TextInput
    //                 style={st.input}
    //                 value={text}
    //                 onChangeText={updateText}
    //                 editable={true}
    //                 onFocus={onFocusHandler}
    //                 onBlur={onBlurHandler}
    //                 blurOnSubmit
    //                 autoCapitalize={'none'}
    //                 secureTextEntry={isPasswordField && !showPassword} // Only apply secureTextEntry if it's a password field
    //             />
    //             {isPasswordField && (
    //                 <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    //                     <Text>
    //                         <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
    //                     </Text>
    //                 </TouchableOpacity>
    //             )}
    //         </View>
    //         </TouchableOpacity>
    //     </Animated.View>
    
    // );
    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined} // iOS dùng "padding", Android không cần
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <Animated.View style={[st.container, { borderWidth: borderWidth, borderColor: borderColor }]}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,  // Đảm bảo TouchableOpacity lấp đầy không gian
                    paddingHorizontal: 10,  // Có thể thêm padding nếu cần
                }}
                onPress={() => {/* Thực hiện hành động nhấn ở đây */}}
            >
                <Animated.View style={[st.animatedStyle, animStyle]}>
                    <Animated.Text
                        style={{
                            color: labelColorAnimation,
                            fontSize: labelFontSize,
                            backgroundColor: labelBackgroundColor,
                            padding: labelPadding,
                        }}
                    >
                        {label}
                    </Animated.Text>
                </Animated.View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <TextInput
                        style={[st.input, { flex: 1, height: '100%' }]}  // TextInput sẽ chiếm toàn bộ không gian trong TouchableOpacity
                        value={text}
                        onChangeText={updateText}
                        editable={true}
                        onFocus={onFocusHandler}
                        onBlur={onBlurHandler}
                        blurOnSubmit
                        autoCapitalize={'none'}
                        secureTextEntry={isPasswordField && !showPassword} // Only apply secureTextEntry if it's a password field
                    />
                    {isPasswordField && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Text>
                                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
        </Animated.View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}
const st = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 8,
        width: width,
        alignSelf: "center",
    },
    input: {
        fontSize: 13,
        height: 35, 
        color: "#000",
        padding: 10
    }, 
    animatedStyle :{
        top: 5,
        left: 15,
        position: "absolute",
        borderRadius: 90,
        zIndex: 10
    }
})