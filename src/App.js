import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Card from './components/Card';
import SeatChart from './components/SeatChart';

// ABIs
import TokenMaster from './abis/TokenMaster.json';

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasions, setOccasions] = useState([]);
  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);
  const [, setTitleColor] = useState('#ee6a79');

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const tokenMaster = new ethers.Contract(
      config[network.chainId].TokenMaster.address,
      TokenMaster,
      provider
    );
    setTokenMaster(tokenMaster);

    const totalOccasions = await tokenMaster.totalOccasions();
    const occasions = [];

    for (let i = 1; i <= totalOccasions; i++) {
      const occasion = await tokenMaster.getOccasion(i);
      occasions.push(occasion);
    }

    setOccasions(occasions);

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleColor((prevColor) => prevColor === '#f8cd82' ? '#f07e88' : '#f8cd82');
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <header
        style={{
          border: '7px solid #fff',
          borderRadius: '20px',
          padding: '20px',
          fontWeight: 'bold',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'linear-gradient(to right, #f8cd82,#f8cd82)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'linear-gradient(to right, #685e68, #685e68)';
        }}
      >
        <Navigation account={account} setAccount={setAccount} />

      
        
      </header>
   

      <div className="cards">
        {occasions.map((occasion, index) => (
          <Card
            occasion={occasion}
            id={index + 1}
            tokenMaster={tokenMaster}
            provider={provider}
            account={account}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
            key={index}
          >
            <button
              style={{
                marginTop: '10px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              onClick={() => {
                // Logical butto n
              }}
            >
              Botón
            </button>
            
          </Card>
        ))}
      </div>

      {toggle && (
        <SeatChart
          occasion={occasion}
          tokenMaster={tokenMaster}
          provider={provider}
          setToggle={setToggle}
        />
      )}
         <footer style={{ textAlign: "center", marginTop: "20px" }}>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <a href="www.linkedin.com/in/supeshala-sumanasena-7b2b80254" target="_blank" rel="noopener noreferrer">
      <img src="https://image.similarpng.com/very-thumbnail/2021/01/Linkedin-icon-design-premium-vector-PNG.png"  width={40} alt="Linkedln" />
    </a>
    <p style={{ fontWeight: "bold", marginTop: "10px" }}>Made By Supeshala Sumanasena for Bistec Global 2023/10/08</p>
  </div>

</footer>
    </div>
    
  );
}

export default App;