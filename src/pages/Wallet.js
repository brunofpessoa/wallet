import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="flex-column">
        <div className="theme-bg">
          <div className="gap pad">
            <Header />
          </div>
        </div>
        <div className="gap pad">
          <WalletForm />
        </div>
        <div className="gap pad">
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
