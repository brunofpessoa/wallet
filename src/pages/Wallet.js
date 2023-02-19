import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="flex-column">
        <div className="theme-bg shadow">
          <div className="gap pad">
            <Header />
          </div>
        </div>
        <div className="gap pad shadow flex justify-center">
          <WalletForm />
        </div>
        <div className="flex justify-center gap pad shadow">
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
