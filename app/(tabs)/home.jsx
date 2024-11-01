import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import{images} from '../../constants'
import SearchInput from '../../components/myComponents/SearchInput'
import Trending from '../../components/myComponents/Trending'
import EmptyState from '../../components/myComponents/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect (() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await getAllPosts();
  //       setData(response);
  //     } catch (error) {
  //       Alert.alert('Error',error.message)
  //     } finally{
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // },[])
  const {data: posts, refetch} = useAppwrite(getAllPosts);

  console.log("data",posts);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-primary h-full">
        {/* one flatlist
            with list header
            and horizontal flatlist
            we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending) */}
      <FlatList
      data={[{id:1},{id:2},{id:3}]}
      // data={[]}
      keyExtractor={(item) => item.$id}
      renderItem={({item}) => (
        <Text className= "text-3xl text-white"> {item.id}</Text>
      )}
      ListHeaderComponent={() => (
        <View>
          <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Houda
                </Text>
              </View>

              <View className="mt-5">
                <Image source={images.logoSmall}
                className="w-9 h-10"
                resizeMode='contain'
                />
              </View>
          </View>
          
          <SearchInput/>

          <View className = "w-full flex-1 pt-5 pb-8">
            <Text className="text-gray-100 text-lg font-pregular mb-3">
              Latest Videos
            </Text>
            <Trending posts={[{id:1},{id:2},{id:3}] ?? []} />
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home