import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import { fetchExercisesByBodyPart } from '../api/excerciseDb';

const Excercise = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute to get navigation params
  const { item } = route.params; // Destructure item from route params

  useEffect(() => {
    if (item) {
      getExcercises(item.name);
    }
  }, [item]);

  const getExcercises = async (bodyPart) => {
    let data = await fetchExercisesByBodyPart(bodyPart);
    console.log(data);
  };

  return (
    <View className="mt-20">
      <Text>Exercise</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Excercise;
