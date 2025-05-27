import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";

type Props = {
    placeholder : string,
    onPress ?: () => void,
    value : string,
    onChangeText ?: (text: string) => void
}

export default function SearchBar( { placeholder, onPress, value, onChangeText } : Props ) {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-5">
            <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff"></Image>
            <TextInput placeholder={placeholder}
                onPress={onPress}
                placeholderTextColor='#a8b5db'
                value = {value}
                onChangeText={onChangeText}
                className="flex-1 ml-2 text-white" 
            />
        </View>
    );
}