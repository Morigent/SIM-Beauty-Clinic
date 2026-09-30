import { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../theme/style";
import Navbar from "../components/Navbar";
import { Image } from "expo-image";

export default function Index() {
  const [activeKey, setActiveKey] = useState('home');

  return (
    <View style={styles.screen}>
      <Navbar
        activeKey={activeKey}
        onNavPress={setActiveKey}
        onSignInPress={() => console.log('Sign in pressed')}
        brandName="LuxeDerm"
      />

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          LoxeDerm Lorem Ipsum{'\n'}Sit dolor Amet
        </Text>
      </View>
      <Image
        style={styles.heroImageBlock}
        contentFit="contain"
        contentPosition="center"
        source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDRweZX-95PaPGPBtFJS9m9O2SkZ-WWb40xPmXO6HzogVdqZVBtBUkVyKH&s=10"
      />
    </View>
  );
}