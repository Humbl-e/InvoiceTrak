import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import InvoiceProvider from './app/components/store/InvoiceProvider';

export default function InvoiceTrak(props) {
  return (
    <InvoiceProvider>
      <App />
    </InvoiceProvider>
  );
}

AppRegistry.registerComponent(appName, () => InvoiceTrak);
