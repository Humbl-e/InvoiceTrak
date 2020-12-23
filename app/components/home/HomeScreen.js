import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { windowHeight, windowWidth } from '../../utilities/Dimensions';
import AddButton from '../global/AddButton';
import { InvoicesAllTab, InvoicesPaidTab, InvoicesUnpaidTab } from '../tabs';
import Colors from '../../styles/Colors';
import { InvoiceContext } from '../store/InvoiceProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const initialLayout = { width: windowWidth, height: 0 };

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: Colors.white }}
    style={{ backgroundColor: Colors.slate }}
    tabStyle={{ flex: 1, paddingHorizontal: -5, zIndex: 2 }}
  />
);

export default function HomeScreen({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const { data, dispatch } = useContext(InvoiceContext);

  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Outstanding' },
    { key: 'third', title: 'Paid' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <InvoicesAllTab navigation={navigation} />;
      case 'second':
        return <InvoicesUnpaidTab navigation={navigation} />;
      case 'third':
        return <InvoicesPaidTab navigation={navigation} />;
      default:
        return null;
    }
  };

  const goToInvoice = () => {
    navigation.navigate('Add Invoice');
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        sceneContainerStyle={{ backgroundColor: Colors.lightGrey }}
        renderTabBar={renderTabBar}
      />
      <AddButton onPress={goToInvoice} />
    </View>
  );
}
