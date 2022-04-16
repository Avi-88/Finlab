import { Avatar} from '@mui/material';
import axios from 'axios';
import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import LineChart from './LineChart';



const CoinData = () => {

const { coinId } = useParams();
 
const [coinData, setCoinData] = useState({});
const [coinChartData, setCoinChartData] = useState([]);
const [isLoading, setLoading] = useState(true)

const [toggle, setToggle] = useState(false);

    const triggerToggle = () => {
        setToggle( !toggle )
    }  
    
    useEffect(()=>{
      const getProfileData = async () =>{
      const requestOne = await axios (`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false`);
      const requestTwo = await axios (`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=hourly`);

      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        
        setCoinData(responseOne.data)
        setCoinChartData(responseTwo.data);   
        setLoading(false)
      }))
      .catch(error => {
        alert("There was an error: " + error);
      })
    }
    
    getProfileData();
  }, [coinId]);




    return isLoading ? (
      <Loading/>
    ) :(<Fragment>
        <div className='container px-4 py-5'>
          <div className='coin-data-slab'>
            <div className='row align-items-stretch g-4 py-5'>
              <div className='col-lg-4 col-md-6 order-lg-1 order-2 col-12'>
             
                <div className=' col coin-data-col-2'>
                
                  <tbody style={{width:"100%"}}>
                    <tr className='info-row'>
                      <td style={{width:"80%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>{(coinData.symbol).toUpperCase()} Price</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right"}}>${(coinData.market_data.current_price.usd).toFixed(4)}</td>
                    </tr>

                    <tr className='info-row'>
                      <td style={{width:"50%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>Market Cap</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right"}}>${(coinData.market_data.market_cap.usd).toLocaleString('en')}</td>
                    </tr>

                    <tr className='info-row'>
                      <td style={{width:"50%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>Trading Volume</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right"}}>${(coinData.market_data.total_volume.usd).toLocaleString('en')}</td>
                    </tr>

                    <tr className='info-row'>
                      <td style={{width:"50%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>24h Low / 24h High</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right",whiteSpace:"nowrap"}}>${(coinData.market_data.low_24h.usd).toFixed(2)} / ${(coinData.market_data.high_24h.usd).toFixed(2)}</td>
                    </tr>

                    <tr className='info-row'>
                      <td style={{width:"50%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>Total Supply </td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right"}}>{(coinData.market_data.total_supply) === null ? ("NA"):((coinData.market_data.total_supply).toLocaleString('en'))}</td>
                    </tr>

                    <tr className='info-row'>
                      <td style={{width:"50%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>Max Supply</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right"}}>{(coinData.market_data.max_supply) === null ? ("NA"):((coinData.market_data.max_supply).toLocaleString('en'))}</td>
                    </tr>
                  </tbody>
                </div>
               
              </div>
               
              <div className='col-lg-4 col-md-12 order-lg-2 order-1 col-12'>
              <div className='col coin-info'>
              <span className='coin-rank'>Rank #{coinData.market_cap_rank}</span>
               <div style={{marginTop:15, marginBottom:15,padding:"10px"}}>
                   <Avatar sx={{width:120, height:120, marginLeft:"auto", marginRight:"auto", marginBottom:4}} src={coinData.image.large}/>
                   <h2 style={{ textAlign:"center"}} >{coinData.name} ({(coinData.symbol).toUpperCase()})  </h2>
                   <h1 style={{padding:5,textAlign:"center", whiteSpace:"nowrap"}}>${(coinData.market_data.current_price.usd).toFixed(4)} {(coinData.market_data.price_change_percentage_24h)> 0 ? (<span style={{fontSize:20,color:"#96d800"}}>{(coinData.market_data.price_change_percentage_24h).toFixed(2)}%</span>) : (<span style={{fontSize:20, color:"#c62f2d"}}>{(coinData.market_data.price_change_percentage_24h).toFixed(2)}%</span>)} </h1>
               </div>
               <div className='container'>
                  <div style={{justifyContent:"center"}} className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                      <div className='col'>
                        <p style={{whiteSpace:"nowrap"}}>Official Website:</p>
                        
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                      <div className='col'>
                        <p>Explorers:</p>
                        
                        <div className='dropdown'>
                        <div className='links-select' > 
                            <div className='dropdown-heading'><a className='d-link' style={{overflow:'hidden'}} href={coinData.links.blockchain_site[0]} target={"_blank"} rel='noreferrer' >{(coinData.links.blockchain_site[0]).substring(0,15)}...</a></div>
                            <button className='d-button' onClick={triggerToggle}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                              </svg>
                            </button>
                        </div>    
                        <div style={toggle ? {display:"block"} : {display:"none"}} className='dropdown-content'>{coinData.links.blockchain_site.map((link,index) => {
                           return (
                             <a className='d-link' key={index}  href={link} target={"_blank"} rel='noreferrer' ><div>{(link)?.substring(0,15)}</div></a>
                           )
                         })}</div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 visual-data'>
                      <p style={{marginBottom:"10px"}}>Public Opinion :</p>
      
                      <div className='container-poll'>
                        <div style={{width:`${coinData.sentiment_votes_up_percentage}%`,height:"5px",backgroundColor:"#96d800", borderRadius:"10px"}}></div>
                      </div> 
                      <div style={{position:"relative"}}>
                        <span style={{position:"absolute",top:0, left:0}}>Good</span>
                        <span style={{position:"absolute",top:"20px", left:0, fontSize:"small", color:"#96d800"}}>{coinData.sentiment_votes_up_percentage}%</span>
                        <span style={{position:"absolute",top:"20px", right:0, fontSize:"small", color:"#c62f2d"}}>{coinData.sentiment_votes_down_percentage}%</span>
                        <span style={{position:"absolute",top:0, right:0}}>Bad</span>
                      </div> 
                      
                    </div>
                  </div>
               </div>
               </div>
              </div>

              <div className='col-lg-4 col-md-6 order-3 col-12'>
                <div className=' col coin-data-col-3'>
                <tbody style={{width:"100%"}}>
                    <tr className='info-row' >
                      <td style={{width:"80%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>Fully Diluted Valuation</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right"}}>{(coinData.market_data.fully_diluted_valuation.usd) === undefined ? ("NA"):((coinData.market_data.fully_diluted_valuation.usd).toLocaleString('en'))}</td>
                    </tr>

                    <tr className='info-row'>
                      <td style={{width:"50%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>Market Cap Rank</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right"}}>#{coinData.market_data.market_cap_rank}</td>
                    </tr>

                    <tr className='info-row'>
                      <td style={{width:"50%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>Circulating Supply</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right"}}>{(coinData.market_data.circulating_supply).toLocaleString('en')}</td>
                    </tr>

                    <tr className='info-row'>
                      <td style={{width:"50%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>Mkt Cap Change last 24h</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right"}}>{coinData.market_data.market_cap_change_percentage_24h_in_currency.usd}%</td>
                    </tr>

                    <tr className='info-row'>
                      <td style={{width:"50%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>All-Time High</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right", whiteSpace:"nowrap"}}>${(coinData.market_data.ath.usd.toFixed(2))} {(coinData.market_data.ath_change_percentage.usd)> 0 ? (<span style={{color:"#96d800"}}>{(coinData.market_data.ath_change_percentage.usd).toFixed(2)}%</span>) : (<span style={{ color:"#c62f2d"}}>{(coinData.market_data.ath_change_percentage.usd).toFixed(2)}%</span>)}</td>
                    </tr>

                    <tr className='info-row'>
                      <td style={{width:"50%", padding:"20px", textAlign:"left", color:"#14FFEC"}}>All-Time Low</td>
                      <td style={{width:"50%", padding:"20px", textAlign:"right",whiteSpace:"nowrap"}}>${(coinData.market_data.atl.usd).toFixed(2)} {(coinData.market_data.atl_change_percentage.usd)> 0 ? (<span style={{color:"#96d800"}}>{(coinData.market_data.atl_change_percentage.usd).toFixed(2)}%</span>) : (<span style={{ color:"#c62f2d"}}>{(coinData.market_data.atl_change_percentage.usd).toFixed(2)}%</span>)}</td>
                    </tr>
                  </tbody>
                </div>
              </div>
            </div>
            </div>
        </div>

        <div className='container' style={{backgroundColor:'#222831', borderRadius:'10px'}}>
          <LineChart coinName={coinData.name} coinChartData={coinChartData}/>
        </div>
        </Fragment>
    )
}

export default CoinData
