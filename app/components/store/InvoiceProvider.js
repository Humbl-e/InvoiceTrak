/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionType from '../config/actionTypes';

export const InvoiceContext = createContext();

export const set_Loading = (loading) => {
  return {
    type: actionType.SET_LOADING,
    loading,
  };
};

const initialState = {
  invoices: {
    byId: {},
    allIds: [],
  },
  invoiceDetails: [],
  invoiceTotal: '0.00',
  lastInvoice: '00001',
};

const invoiceReducer = (state, action) => {
  switch (action.type) {
    case actionType.REHYDRATE_STORE:
      return { ...action.storage };

    case actionType.RESET_DATA:
      return { ...initialState };

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
        lastInvoice: invoiceNumber,
      };

    case actionType.REMOVE_INVOICE:
      const allIDS = state.invoices.allIds;
      const byID = { ...state.invoices.byId };
      delete byID[action.invoiceId];
      const newAllIDS = allIDS.filter((e) => e !== action.invoiceId);
      if (newAllIDS.length < 1) {
        console.log('cleared all invoices');
        return {
          ...state,
          invoices: {
            byId: byID,
            allIds: newAllIDS,
          },
          lastInvoice: '00001',
        };
      }
      return {
        ...state,
        invoices: {
          byId: byID,
          allIds: newAllIDS,
        },
      };

    case actionType.UPDATE_INVOICE:
      const id = action.payload.id;
      return {
        ...state,
        invoices: {
          ...state.invoices,
          byId: {
            ...state.invoices.byId,
            [id]: action.payload,
          },
        },
      };

    case actionType.ADD_DETAILS:
      const currentTotal = Number.parseFloat(state.invoiceTotal);
      const add = Number.parseFloat(action.payload.subTotal);
      const newTotal = (currentTotal + add).toFixed(2);
      return {
        ...state,
        invoiceDetails: [...state.invoiceDetails, action.payload],
        invoiceTotal: newTotal,
      };

    case actionType.UPDATE_DETAILS:
      const detailsArray = action.payload.details;
      return {
        ...state,
        invoiceDetails: [...state.invoiceDetails, ...detailsArray],
        invoiceTotal: action.payload.total,
      };

    case actionType.EDIT_DETAILS:
      const index = action.payload.index;

      const prevSubtotal = Number.parseFloat(state.invoiceDetails[index].subTotal);
      const currInvoiceTotal = Number.parseFloat(state.invoiceTotal);
      const editedTotal = Number.parseFloat(action.payload.subTotal);
      const newEditedTotal = Math.abs(currInvoiceTotal - prevSubtotal + editedTotal).toFixed(2);

      state.invoiceDetails[index] = action.payload;

      return {
        ...state,
        invoiceTotal: newEditedTotal,
      };

    case actionType.RESET_DETAILS:
      return {
        ...state,
        invoiceDetails: [],
        invoiceTotal: '0.00',
      };

    case actionType.SET_INVOICE_TOTAL:
      return { ...state, invoiceTotal: action.payload.invoiceTotal };

    case actionType.SET_LOADING:
      return { ...state, loading: action.loading };

    default:
      return state;
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('invoices');
    return jsonValue ? JSON.parse(jsonValue) : initialState;
  } catch (e) {
    console.log('failed to get Data object');
  }
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('invoices', jsonValue);
  } catch (e) {
    console.log('error saving');
  }
};

export default function InvoiceProvider(props) {
  const [loaded, setLoaded] = useState(false);
  const [data, dispatch] = useReducer(invoiceReducer, initialState);

  // Loading initial Satte
  useEffect(() => {
    async function fetchAsyncStore() {
      const storage = await getData();
      console.log('storage data set,');
      dispatch({ type: 'REHYDRATE_STORE', storage });
      setLoaded(true);
    }
    fetchAsyncStore();
  }, []);

  useEffect(() => {
    console.log('just running onDataChange,');
    if (data.invoiceDetails?.length < 1 && loaded) {
      console.log('storing data,', data);
      storeData(data);
    }
  }, [data]);

  return <InvoiceContext.Provider value={{ data, loaded, dispatch }}>{props.children}</InvoiceContext.Provider>;
}
