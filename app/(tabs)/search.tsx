import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Search() {

    const [searchTerm, setSearchTerm] = useState('');
    const { data : movies, loading, error, refetch, reset } = useFetch(() => fetchMovies({ query : searchTerm }));

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if(searchTerm.trim()) {
                await refetch();
            } else {
                reset();
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="contain" tintColor="#ab8bff"/>
            <FlatList
                data={movies}
                renderItem={( {item} ) => (
                    <MovieCard {...item} />
                )}
                numColumns={3}
                className="px-5"
                columnWrapperStyle={{
                    gap : 16,
                    justifyContent : 'center',
                    marginVertical : 16
                }}
                contentContainerStyle = {{ paddingBottom : 100 }}
                keyExtractor={(movie) => movie.id.toString()}
                ListHeaderComponent={
                    <>
                        <View className="w-full mt-20 flex-row justify-center items-center">
                            <Image source={icons.logo} className="w-12 h-10"/>
                        </View>
                        <View className="my-5">
                            <SearchBar placeholder="Search Movies..." value={searchTerm} onChangeText={(text) => setSearchTerm(text)}/>
                            { loading && <ActivityIndicator size="large" color="#0000ff" className="my-3"/> }
                            { error && <Text className="text-red-500 px-5 my-3">Error : {error.message}</Text> }
                            { !loading && searchTerm.trim().length > 0 && movies?.length > 0 && (
                                <Text className="text-xl text-white font-bold">
                                    Search Results for : <Text className="text-accent">{searchTerm}</Text>
                                </Text>)
                            } 
                        </View>
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchTerm.trim() ? 'No Movies Found' : 'Search for a movie...'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
}