import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { windowHeight, windowWidth } from '../../utilities/Dimensions';
import AddButton from '../global/AddButton';
import { InvoicesAllTab, InvoicesPaidTab, InvoicesUnpaidTab } from '../tabs';
import Colors from '../../styles/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const FirstRoute = () => <InvoicesAllTab />;

const SecondRoute = () => <InvoicesUnpaidTab />;
const ThirdRoute = () => <InvoicesPaidTab />;

const initialLayout = { width: windowWidth, height: windowHeight };

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: Colors.white }}
    style={{ backgroundColor: Colors.slate }}
    tabStyle={{ flex: 1, paddingHorizontal: -5 }}
  />
);

export default function HomeScreen({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Outstanding' },
    { key: 'third', title: 'Paid' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const goToInvoice = () => {
    navigation.navigate('Invoice');
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
