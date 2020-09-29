import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {windowHeight, windowWidth} from '../../utilities/Dimensions';
import AddButton from '../global/AddButton';

const FirstRoute = () => <View style={[styles.scene]} />;

const SecondRoute = () => <View style={[styles.scene]} />;
const ThirdRoute = () => <View style={[styles.scene]} />;

const initialLayout = {width: windowWidth, height: windowHeight};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'white'}}
    style={{backgroundColor: '#2F4F4F'}}
  />
);

export default function HomeScreen({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'All'},
    {key: 'second', title: 'Outstanding'},
    {key: 'third', title: 'Paid'},
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
    <View style={{flex: 1}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{flex: 1}}
        sceneContainerStyle={{backgroundColor: '#c8c8c8'}}
        renderTabBar={renderTabBar}
      />
      <AddButton onPress={goToInvoice} />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
