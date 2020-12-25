/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Form, Item, Input, Label, Separator, Icon } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../styles/Colors';
import InvoiceListItem from '../global/InvoiceListItem';
import FormButton from '../global/FormButton';
import DateHolder from '../global/DateHolder';
import { InvoiceContext } from '../store/InvoiceProvider';
import {
  ADD_DETAILS,
  ADD_INVOICE,
  EDIT_DETAILS,
  UPDATE_DETAILS,
  RESET_DETAILS,
  UPDATE_INVOICE,
  REMOVE_INVOICE,
} from '../config/actionTypes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
    padding: 5,
  },
  textFooter: {
    fontSize: 16,
  },
});

export default function InvoiceCreateScreen({ navigation, route }) {
  const { data, dispatch } = useContext(InvoiceContext);
  const editMode = route.params?.editMode;
  const id = route.params?.id;

  const invoiceNumber = editMode ? id : data.lastInvoice;

  const parts = data.invoices.byId[id]?.date?.split('/');
  const dt = parts ? new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10)) : new Date();

  const [paid, setPaid] = useState(editMode ? data.invoices.byId[id]?.isPaid : false);
  const [clientName, setClientName] = useState(editMode ? data.invoices.byId[id]?.clientName : '');
  const [date, setDate] = useState(editMode ? new Date(dt) : new Date());
  const [show, setShow] = useState(false);
  const [receivedName, setReceivedName] = useState(editMode ? true : false);

  useLayoutEffect(() => {
    if (editMode) {
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
    }
  }, [navigation]);

  useEffect(() => {
    if (editMode) {
      const singleInvoice = data.invoices.byId[id];
      dispatch({
        type: UPDATE_DETAILS,
        payload: {
          details: singleInvoice.details,
          total: singleInvoice.total,
        },
      });
    }
    return () => {
      dispatch({ type: RESET_DETAILS });
    };
  }, []);

  const openDialog = () => {
    const resetInvoices = data.invoices.allIds.length === 1;
    const resetText =
      'Are you sure you wish to delete this invoice? This will reset the invoice number and all data will be lost. Proceed with caution.';
    const deleteText = 'Are you sure you wish to delete this invoice?';
    Alert.alert(
      'Delete Invoice',
      resetInvoices ? resetText : deleteText,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: resetInvoices ? 'DELETE' : 'OK',
          onPress: () => {
            navigation.goBack();
            dispatch({ type: REMOVE_INVOICE, invoiceId: id });
          },
          style: resetInvoices ? 'default' : 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const changePaid = () => {
    setPaid((prevState) => !prevState);
  };

  const showMode = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const saveInvoice = () => {
    const invoice = {
      id: invoiceNumber,
      clientName,
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      isPaid: paid,
      details: data.invoiceDetails,
      total: data.invoiceTotal,
    };
    dispatch({ type: ADD_INVOICE, payload: invoice });
    navigation.goBack();
  };

  const updateInvoice = () => {
    const updatedInvoice = {
      id: invoiceNumber,
      clientName,
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      isPaid: paid,
      details: data.invoiceDetails,
      total: data.invoiceTotal,
    };
    dispatch({ type: UPDATE_INVOICE, payload: updatedInvoice });
    navigation.goBack();
  };

  const goToInvoiceDetail = ({ item, index }) => {
    if (item) {
      navigation.navigate('Invoice Detail', { item, index, addDetails, editDetails });
    } else {
      navigation.navigate('Invoice Detail', { addDetails });
    }
  };

  const addDetails = (detail) => {
    dispatch({ type: ADD_DETAILS, payload: detail });
  };

  const editDetails = (detail) => {
    dispatch({ type: EDIT_DETAILS, payload: detail });
  };

  const renderItem = ({ item, index }) => {
    return <InvoiceListItem item={item} index={index} onPress={() => goToInvoiceDetail({ item, index })} />;
  };

  const renderFooter = () => {
    return <InvoiceListItem footer onPress={goToInvoiceDetail} />;
  };

  return (
    <Container style={styles.container}>
      <ScrollView>
        <Separator style={{ flex: 0.05 }}>
          <Text>Details</Text>
        </Separator>
        <Form>
          <Item inlineLabel>
            <Label>Invoice Number</Label>
            <Input value={invoiceNumber} editable={false} />
          </Item>
          <Item inlineLabel>
            <Label>Client Name</Label>
            <Input
              placeholder={'ABC Ltd...'}
              placeholderTextColor={Colors.lightGrey}
              value={clientName}
              onChangeText={setClientName}
              onBlur={() => setReceivedName(true)}
            />
          </Item>
          {!clientName && receivedName && <Text style={{ color: Colors.red, fontSize: 12, paddingStart: 15 }}>Name is required</Text>}
          <Item inlineLabel last>
            <Label>Date</Label>
            <DateHolder date={date} onPress={showMode} />
          </Item>
        </Form>
        <Separator style={{ flex: 0.05 }}>
          <Text>Invoice Details</Text>
        </Separator>
        <FlatList
          data={data.invoiceDetails}
          extraData={data.invoiceDetails}
          scrollEnabled={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.description + index}
          ListFooterComponent={renderFooter}
        />
        <View style={styles.footer}>
          <Text style={styles.textFooter}>SubTotal</Text>
          <Text style={styles.textFooter}>{`£${data.invoiceTotal}`}</Text>
        </View>

        <View style={styles.btnContainer}>
          <FormButton style={{ backgroundColor: paid ? Colors.green : Colors.red }} title={'Paid'} onPress={changePaid} />
          <FormButton
            title={editMode ? 'Update Invoice' : 'Save Invoice'}
            onPress={editMode ? updateInvoice : saveInvoice}
            disabled={data.invoiceDetails.length < 1 || !clientName}
          />
        </View>
      </ScrollView>
      {show && <DateTimePicker value={date} is24Hour={true} display="default" onChange={onChange} />}
    </Container>
  );
}
