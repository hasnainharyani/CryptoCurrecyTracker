import React from "react";
import './App.css'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Coin from "./Coin";

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=pkr&order=market_cap_desc&per_page=100&page=1&sparkline=false').then((res)=>{
      setCoins(res.data);
      console.log(res.data)
    }).catch(error=>alert(`error! : ${error}`));
  })

  const handleChange =e =>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase()) )

  return (
    <>
   
    <body>
      <div className="coin-app">
      <h1 className="title">Top 100 Crypto Currencies And Their Price in PKR</h1>
      <div className="coin-search">
         <h2 className="coin-text">Search a currency</h2>
         <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>
         </form>
      </div>
      {filteredCoins.map(coin=>{
        return(
          <Coin key={coin.id}
           name={coin.name}
            image={coin.image}
             symbol={coin.symbol}
             marketcap={coin.market_cap}
             price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
           volume={coin.total_volume} 
          rank={coin.market_cap_rank}/>
        )
      })}
    </div>
    <div className="footer">Created by Hasnain Raza.</div>
    </body>
    </>
  );
}

export default App;
