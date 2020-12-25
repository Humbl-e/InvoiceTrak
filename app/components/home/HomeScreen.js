/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { windowWidth } from '../../utilities/Dimensions';
import AddButton from '../global/AddButton';
import { InvoicesAllTab, InvoicesPaidTab, InvoicesUnpaidTab } from '../tabs';
import Colors from '../../styles/Colors';
import { InvoiceContext } from '../store/InvoiceProvider';
import { Icon } from 'native-base';
import { RESET_DATA } from '../config/actionTypes';

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
        return <InvoicesAllTab />;
      case 'second':
        return <InvoicesUnpaidTab />;
      case 'third':
        return <InvoicesPaidTab />;
      default:
        return null;
    }
  };

  const goToInvoice = () => {
    navigation.navigate('Add Invoice');
  };

  useLayoutEffect(() => {
    const invoices = data.invoices.allIds.length > 0;
    if (invoices) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={{ marginHorizontal: 11, marginVertical: 3, alignItems: 'center' }} onPress={openDialog}>
            <Icon
              name="trash-outline"
              style={{ width: 24, height: 24, margin: 3, color: Colors.white, fontSize: 24, overflow: 'hidden' }}
            />
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => {
          return null;
        },
      });
    }
  }, [data.invoices.allIds.length, navigation]);

  const openDialog = () => {
    Alert.alert(
      'Reset Invoices',
      'Are you sure you wish to delete all invoices?\nThis will reset the invoice number and erase all data.\nProceed with caution.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'RESET',
          onPress: () => dispatch({ type: RESET_DATA }),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
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
