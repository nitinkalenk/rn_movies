import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, ImageSourcePropType, Text, View } from "react-native";

type TabBarIconProps = {
    title : string,
    icon : ImageSourcePropType,
    focused : boolean
}

function TabBarIcon( { title, icon, focused } : TabBarIconProps ) {
    if(focused) {
        return (
            <ImageBackground 
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
                >
                    <Image source={icon} tintColor="#151312" className="size-5"/>
                    <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
            </ImageBackground>
        )
    } else {
        return (
            <View className="size-full justify-center items-center mt-4 rounded-full">
                <Image source={icon} tintColor="#A8B5DB" className="size-5" />
            </View>
        )
    }
}

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel : false,
                tabBarItemStyle : {
                    width : '100%',
                    height : '100%',
                    justifyContent : 'center',
                    alignItems: 'center'
                },
                tabBarStyle : {
                    backgroundColor : '#0f0D23',
                    borderRadius : 50,
                    marginHorizontal : 20,
                    marginBottom : 36,
                    height : 52,
                    position : 'absolute',
                    overflow : 'hidden',
                    borderWidth : 1,
                    borderColor : '0f0d23'
                }
            }}      
        >
            <Tabs.Screen name="index" options={{
                    headerShown : false,
                    title : 'Home',
                    tabBarIcon : ( { focused } ) => (
                        <TabBarIcon title="Home" icon={icons.home} focused={focused}></TabBarIcon>
                    )
                }}>
            </Tabs.Screen>
            <Tabs.Screen name="profile" options={{
                    headerShown : false,
                    title : 'Profile',
                    tabBarIcon : ( { focused } ) => (
                        <TabBarIcon title="Profile" icon={icons.person} focused={focused}></TabBarIcon>
                    )
                }}>
            </Tabs.Screen>
            <Tabs.Screen name="saved" options={{
                    headerShown : false,
                    title : 'Saved',
                    tabBarIcon : ( { focused } ) => (
                        <TabBarIcon title="Saved" icon={icons.save} focused={focused}></TabBarIcon>
                    )
                }}>
            </Tabs.Screen>
            <Tabs.Screen name="search" options={{
                    headerShown : false,
                    title : 'Search',
                    tabBarIcon : ( { focused } ) => (
                        <TabBarIcon title="Search" icon={icons.search} focused={focused}></TabBarIcon>
                    )
                }}>
            </Tabs.Screen>
        </Tabs>

    );
}