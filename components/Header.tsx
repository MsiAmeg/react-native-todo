import {StyleSheet, Text, View} from 'react-native';
import Animated, {FadeIn, FadeInUp} from 'react-native-reanimated';

export default function Header() {
  return (
    <Animated.View entering={FadeInUp} style={styles.headerSection}>
      <Text style={styles.headerTitle}>Todo List</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 64,
    fontWeight: '700',
    color: 'white',
  },
});
