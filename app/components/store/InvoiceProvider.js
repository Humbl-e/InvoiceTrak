import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionType from '../config/actionTypes';

export const InvoiceContext = createContext();

export const set_Loading = (loading) => {
  return {
    type: actionType.SET_LOADING,
    loading,
  };
};

const initalState = {
  invoices: {
    byId: {},
    allIds: [],
  },
  invoiceDetails: [],
  invoiceTotal: '0.00',
  lastInvoice: '00001',
  loading: false,
};

const invoiceReducer = (state, action) => {
  switch (action.type) {
    case actionType.ADD_INVOICE:
      const zeroPad = (num, places) => String(num).padStart(places, '0');
      const invoiceNumber = zeroPad(Number.parseInt(action.payload.id) + 1, 5);
      const byId = {
        ...state.invoices.byId,
        [action.payload.id]: action.payload,
      };
      return {
        ...state,
        invoices: {
          byId,
          allIds: Object.keys(byId),
        },
        invoiceDetails: [],
        invoiceTotal: '0.00',
        lastInvoice: invoiceNumber,
      };
    case actionType.REMOVE_INVOICE:
      console.log(action.id);
      return state.filter((invoice) => invoice.id !== action.id);
    case actionType.EDIT_INVOICE:
      console.log(action.id);
      return state;
    case actionType.ADD_DETAILS:
      const currentTotal = Number.parseFloat(state.invoiceTotal);
      const add = Number.parseFloat(action.payload.subTotal);
      const newTotal = (currentTotal + add).toFixed(2);
      return { ...state, invoiceDetails: [...state.invoiceDetails, action.payload], invoiceTotal: newTotal };
    case actionType.RESET_DETAILS:
      console.log(action.id);
      return state;
    case actionType.SET_INVOICE_TOTAL:
      return { ...state, invoiceTotal: action.payload.invoiceTotal };
    case actionType.SET_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};

export default function InvoiceProvider(props) {
  const [data, dispatch] = useReducer(invoiceReducer, initalState);

  //   useEffect(() => {
  // console.log(props.children);
  //     AsyncStorage.setItem('invoices', JSON.stringify(invoices));
  //   }, [invoices]);

  return <InvoiceContext.Provider value={{ data, dispatch }}>{props.children}</InvoiceContext.Provider>;
}
