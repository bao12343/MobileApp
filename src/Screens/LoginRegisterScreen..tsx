import React, { useContext, useEffect, useState } from "react";
import {
    View, Text, SafeAreaView, ScrollView, Platform, Pressable, Alert,
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
} from "react-native";
import { UserDataForm } from "../Components/LoginRegisterComponents/UserDataForm";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackScreenProps } from "../Navigation/RootNavigator";
import { HeadersComponent } from "../Components/HeaderComponents/HeadersComponent";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";


const UserAuth = ({ navigation, route }: RootStackScreenProps<"UserLogin">) => {

    const [showRegistrationScreen, setShowRegistrationScreen] =
        useState<boolean>(false);
    const { firstName, lastName, email, password, confirmPassword, mobileNo } =
        route.params;
    const { getUserId, setGetUserId } = useContext(UserType);
    const userRegistrationParams = {
        firstName,
        lastName,
        email,
        mobileNo,
        password,
        confirmPassword,
    };
    const [userSignupForm, setUserSignupForm] = useState(userRegistrationParams);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSignUpTextchange = (text: string, fieldName: string) => {
        setUserSignupForm({ ...userSignupForm, [fieldName]: text });
    };
    const SubmitRegistrationForm = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        Alert.alert("Now, let's start programming the User Registration!");
    };
    const userLoginParams = {
        email,
        password,
    };
    const [userLoginForm, setUserLoginForm] = useState(userLoginParams);
    console.log(userLoginParams);
    const handleLoginTextchange = (text: string, fieldName: string) => {
        setUserLoginForm({ ...userLoginForm, [fieldName]: text });
    };
    const SubmitUserLoginForm = () => {
        Alert.alert("Now, let's start programming the User Login!");
    };
    useEffect(() => {
        const fetchUser = async () => {
            const token: any = await AsyncStorage.getItem("authToken");
            const getUserId: string = token;
            setGetUserId(getUserId);
            console.log(`This is the new user id ${getUserId}`);
        };
        fetchUser();
    }, []);
    const handleKeyboardDismiss = () => {
        Keyboard.dismiss();
    };
    const { screenTitle } = route.params;
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
            }}
        >
            <HeadersComponent
                pageTitle={screenTitle}
                goToPrevious={() => navigation.goBack()}
            />
            <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <KeyboardAvoidingView>
                            <View style={{ alignItems: "center" }}>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontWeight: "bold",
                                        marginTop: 12,
                                        color: "#041E42",
                                    }}
                                >
                                    {!showRegistrationScreen
                                        ? "Login to your Account"
                                        : "Register a New Account"}
                                </Text>
                            </View>
                            {showRegistrationScreen && (
                                <>
                                    <ScrollView>
                                        <View style={{ marginTop: 10 }}>
                                            <UserDataForm
                                                label="Enter Your FirstName"
                                                labelColor="black"
                                                duration={300}
                                                text={userSignupForm.firstName}
                                                updateText={(text: string) =>
                                                    handleSignUpTextchange(text, "firstName")
                                                }
                                            />
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <UserDataForm
                                                label="Enter Your LastName"
                                                labelColor="black"
                                                duration={300}
                                                text={userSignupForm.lastName}
                                                updateText={(text: string) =>
                                                    handleSignUpTextchange(text, "lastName")
                                                }
                                            />
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <UserDataForm
                                                label="Enter Your Email"
                                                labelColor="black"
                                                duration={300}
                                                text={userSignupForm.email}
                                                updateText={(text: string) =>
                                                    handleSignUpTextchange(text, "email")
                                                }
                                            />
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <UserDataForm
                                                label="Enter Your Mobile Number"
                                                labelColor="black"
                                                duration={300}
                                                text={userSignupForm.mobileNo}
                                                updateText={(text: string) =>
                                                    handleSignUpTextchange(text, "mobileNo")
                                                }
                                            />
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <UserDataForm
                                                label="Enter Your Password"
                                                labelColor="black"
                                                duration={300}
                                                text={userSignupForm.password}
                                                updateText={(text: string) =>
                                                    handleSignUpTextchange(text, "password")
                                                }
                                            />
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <UserDataForm
                                                label="Confirm Your Password"
                                                labelColor="black"
                                                duration={300}
                                                text={userSignupForm.confirmPassword}
                                                updateText={(text: string) =>
                                                    handleSignUpTextchange(text, "confirmPassword")
                                                }
                                            />
                                        </View>
                                    </ScrollView>
                                </>
                            )}
                            {!showRegistrationScreen && (
                                <>
                                    <View style={{ marginTop: 70 }}>
                                        <UserDataForm
                                            label="Enter Your Email"
                                            labelColor="black"
                                            duration={300}
                                            text={userLoginForm.email}
                                            updateText={(text: string) =>
                                                handleLoginTextchange(text, "email")
                                            }
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <UserDataForm
                                            label="Enter Your Password"
                                            labelColor="black"
                                            duration={300}
                                            text={userLoginForm.password}
                                            updateText={(text: string) =>
                                                handleLoginTextchange(text, "password")
                                            }
                                        />
                                    </View>
                                    <View
                                        style={{
                                            margin: 13,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text>Keep me Logged In</Text>
                                        <Text style={{ color: "#007fff", fontWeight: "bold" }}>
                                            Forgot Password
                                        </Text>
                                    </View>
                                </>
                            )}
                            <View style={{ marginTop: 50 }} />
                            {!showRegistrationScreen ? (
                                <Pressable
                                    style={{
                                        width: 200,
                                        backgroundColor: "#febe10",
                                        borderRadius: 6,
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        padding: 15,
                                    }}
                                    onPress={SubmitUserLoginForm}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "#fff",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Login
                                    </Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    style={{
                                        width: 200,
                                        backgroundColor: isSubmitting ? "#ccc" : "#febe10",
                                        borderRadius: 6,
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        padding: 15,
                                    }}
                                    onPress={SubmitRegistrationForm}
                                    disabled={isSubmitting}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "#fff",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Register
                                    </Text>
                                </Pressable>
                            )}

                            {!showRegistrationScreen ? (
                                <Pressable
                                    style={{
                                        marginTop: 15,
                                    }}
                                    onPress={() => setShowRegistrationScreen(true)}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "grey",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Don't have an account? Sign Up
                                    </Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    style={{
                                        marginTop: 15,
                                        marginBottom: 30,
                                    }}
                                    onPress={() => setShowRegistrationScreen(false)}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "grey",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Already have an account ? Login
                                    </Text>
                                </Pressable>
                            )}
                        </KeyboardAvoidingView>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};
export default UserAuth;
