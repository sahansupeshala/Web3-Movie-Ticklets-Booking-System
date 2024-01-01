import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const Navigation = ({ account, setAccount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageUrls = [
    'https://i.imgur.com/J1TFzXj.png',
    

    //  Image URL
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 2000);

    return () => clearInterval(interval);
  }, );

  const backgroundImageStyle = {
    backgroundImage: `url('${imageUrls[currentIndex]}')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  };

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav style={backgroundImageStyle}>
      <div className="nav__brand">
        <h1>Web3 Cinema</h1>


        <ul className="nav__links">
          <li>
            <a href="/">Sci-fi</a>
          </li>
          <li>
            <a href="/">Action</a>
          </li>
          <li>
            <a href="/">Drama</a>
          </li>
        </ul>
      </div>

      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;