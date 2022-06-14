import React, {useState, useEffect, useContext} from 'react'
import { CardActionArea, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import IconButton from '@mui/material/IconButton';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import StarIcon from '@mui/icons-material/Star';
import _ from 'lodash';
import { AuthContext } from '../context/AuthContext';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = (props) => {
 
const {user , isLoggedIn} = useContext(AuthContext);  
const [currentUser, setCurrentUser] = useState(user);
const [paginatedList, setPaginatedList] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [openAlert, setOpenAlert] = useState(false);
const [msg, setMsg] = useState('');
const [type, setType] = useState('info');


const pageSize = 50;

const pageCount = props.mainData ? Math.ceil(props.mainData.length/pageSize) : 0;

const pages = _.range(1, pageCount+1);

const pagination = (pageNo) =>{
  setCurrentPage(pageNo);
  const startIndex = (pageNo - 1)*pageSize;
  const paginated = _(props.mainData)?.slice(startIndex).take(pageSize).value();
  setPaginatedList(paginated);
};

useEffect(()=>{
  setPaginatedList(_(props.mainData)?.slice(0).take(pageSize).value());
},[props.mainData]);


const getCurrentUser = async()=>{
  try {
    const res = await axios(`users/${user._id}`);
    setCurrentUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (error) {
    setOpenAlert(true);
    setMsg('Something Went Wrong!');
    setType('error');
    console.log(error);
  } 
};
      
  
  const handleAddCoin = async(id) =>{
    if(isLoggedIn){
    try {
      const res = await axios.put(`users/${id}/addcoin`, {userId: user._id});
      if(res.status === 200){
      setOpenAlert(true);
      setMsg('Coin added to your Watchlist!');
      setType('success');
      getCurrentUser();
      }
    } catch (error) {
      setOpenAlert(true);
      setMsg('Something Went Wrong!');
      setType('error');
      console.log(error);
    }
  } else {
    setOpenAlert(true);
    setMsg('Login to edit your Watchlist!');
    setType('info');
  }
  };

  const handleRemoveCoin = async(id) =>{
    if(isLoggedIn){
    try {
      const res = await axios.put(`users/${id}/removecoin`, {userId: user._id});
      if(res.status === 200){
        setOpenAlert(true);
        setMsg('Coin removed from your Watchlist!');
        setType('success');
        getCurrentUser();
      }
    } catch (error) {
      setOpenAlert(true);
      setMsg('Something Went Wrong!');
      setType('error');
      console.log(error);
    }
  } else {
    setOpenAlert(true);
    setMsg('Login to edit your Watchlist!');
    setType('info');
  }
  };


  const handleAlerts = (msg,type) =>{
    return (
        <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={type} sx={{ width: '100%' }}>
            {msg}
        </Alert>
        </Snackbar>
    )}  

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };


    return props.isLoading ? (
      <Loading/>
    ) :(
        <div className='home-main'>
          <div className="container  px-4 py-5 stock-cards" >

          <div><h2 className="pb-2 section-heading" style={{color:"white", fontSize:50, textAlign:"center"}}>Trending Right Now</h2></div>
          

          <div className="row row-cols-1 row-cols-lg-3  align-items-stretch g-4 py-5">
            <div className="col col-md-12">
              <CardActionArea >
              <Link className='special-links' to={`/coindata/${props.trending[0].item.id}`} >
              <div className="card card-cover h-100 overflow-hidden text-white  rounded-5 shadow-lg card-levitate " >
                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 top3_cards">
                <Avatar className='shadow-lg' sx={{width:{lg:120, md:100, sm:80, xs:80}, height:{lg:120, md:100, sm:80, xs:80},marginLeft:"auto", marginRight:"auto", marginBottom:4}} src={props.trending[0].item.large}/>
                  
                  <p className='coin_name'>{props.trending[0].item.name}</p>
                 
                  <p className="coin_price">Price : {(props.trending[0].item.price_btc*50955.076475927).toFixed(4)} USD</p>
                  <div className='coin_details'>
                    <p style={{ whiteSpace:"nowrap"}}>MarketCap Rank : {props.trending[0].item.market_cap_rank}</p>
                    <p style={{whiteSpace:"nowrap"}}>Coingecko Rank : {(props.trending[0].item.score)+1}</p>
                  </div>
                  
                </div>
              </div>
              </Link>
              </CardActionArea>
            </div>

            <div className="col col-md-6">
            <CardActionArea>
            <Link className='special-links' to={`/coindata/${props.trending[1].item.id}`} >
              <div className="card card-cover h-100 overflow-hidden text-white  rounded-5 shadow-lg " >
                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 top3_cards">
                <Avatar className='shadow-lg' sx={{width:{lg:120, md:100, sm:80, xs:80}, height:{lg:120, md:100, sm:80, xs:80},marginLeft:"auto", marginRight:"auto", marginBottom:4}} src={props.trending[1].item.large}/>
                
                <p className='coin_name'>{props.trending[1].item.name}</p>
                  <p className="coin_price">Price : {(props.trending[1].item.price_btc*50955.076475927).toFixed(4)} USD</p>
                  <div className='coin_details'>
                    <p style={ {whiteSpace:"nowrap"}}>MarketCap Rank : {props.trending[1].item.market_cap_rank}</p>
                    <p style={{ whiteSpace:"nowrap"}}>Coingecko Rank :{(props.trending[1].item.score)+1}</p>
                  </div>
                  
                </div>
              </div>
              </Link>
              </CardActionArea>
            </div>

            <div className="col  col-md-6">
            <CardActionArea>
            <Link className='special-links' to={`/coindata/${props.trending[2].item.id}`} >
              <div className="card card-cover h-100 overflow-hidden text-white  rounded-5 shadow-lg " >
                <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1 top3_cards">
                  <Avatar className='shadow-lg' sx={{width:{lg:120, md:100, sm:80, xs:80}, height:{lg:120, md:100, sm:80, xs:80},marginLeft:"auto", marginRight:"auto", marginBottom:4}} src={props.trending[2].item.large}/>
                  
                  <p className='coin_name'>{props.trending[2].item.name}</p>
                  <p className="coin_price">Price : {(props.trending[2].item.price_btc*50955.076475927).toFixed(4)} USD</p>
                  <div className='coin_details'>
                    <p style={{ whiteSpace:"nowrap"}}>MarketCap Rank : {props.trending[2].item.market_cap_rank}</p>
                    <p style={{ whiteSpace:"nowrap"}}>Coingecko Rank : {(props.trending[2].item.score)+1}</p>
                  </div>
      
                </div>
              </div>
              </Link>
              </CardActionArea>
            </div>
          </div>
        </div>

      <div className='container'>
        <div className='row row-eq-height small-cards'>
              <div  className='col-lg-3 h-100 col-md-6 col-sm-6 col-12'>
              <CardActionArea sx={{height:'100%'}}>
              <Link className='special-links' to={`/coindata/${props.trending[3].item.id}`} >
                <div className='h-100 card overflow-hidden text-white  rounded-5 resttop_coins shadow-lg rest_coin_cards'>
                <Avatar className='shadow-lg' sx={{width:{lg:80, md:60, sm:50}, height:{lg:80, md:60, sm:50}, marginLeft:"auto", marginRight:"auto", marginBottom:2}} src={props.trending[3].item.large}/>
                  <div className='rest_coin_details'> 
                    <p className='rest_coin_name'>{props.trending[3].item.name}</p>
                    <p>Price: {(props.trending[3].item.price_btc*50955.076475927).toFixed(4)} USD</p>
                    <p>MarketCap Rank : {props.trending[3].item.market_cap_rank}</p>
                    <p>Coingecko Rank : {(props.trending[3].item.score)+1}</p>
                  </div>
                </div>
                </Link>
              </CardActionArea>  
              </div>

              <div  className='col-lg-3 h-100 col-md-6 col-sm-6 col-12'>
              <CardActionArea sx={{height:'100%'}}>
              <Link className='special-links' to={`/coindata/${props.trending[4].item.id}`} >
                <div className='card overflow-hidden text-white  rounded-5 resttop_coins shadow-lg rest_coin_cards'>
                <Avatar className='shadow-lg' sx={{width:{lg:80, md:60, sm:50}, height:{lg:80, md:60, sm:50},marginLeft:"auto", marginRight:"auto", marginBottom:2}} src={props.trending[4].item.large}/>
                  <div className='rest_coin_details'> 
                    <p className='rest_coin_name'>{props.trending[4].item.name}</p>
                    <p>Price: {(props.trending[4].item.price_btc*50955.076475927).toFixed(4)} USD</p>
                    <p>MarketCap Rank : {props.trending[4].item.market_cap_rank}</p>
                    <p>Coingecko Rank : {(props.trending[4].item.score)+1}</p>
                  </div>
                </div>
              </Link>
              </CardActionArea>  
              </div>

              <div  className='col-lg-3 h-100 col-md-6 col-sm-6 col-12'>
              <CardActionArea sx={{height:'100%'}}>
              <Link className='special-links' to={`/coindata/${props.trending[5].item.id}`} >
                <div className='card overflow-hidden text-white  rounded-5 resttop_coins shadow-lg rest_coin_cards'>
                <Avatar className='shadow-lg' sx={{width:{lg:80, md:60, sm:50}, height:{lg:80, md:60, sm:50},marginLeft:"auto", marginRight:"auto", marginBottom:2}} src={props.trending[5].item.large}/>
                  <div className='rest_coin_details'> 
                    <p className='rest_coin_name'>{props.trending[5].item.name}</p>
                    <p>Price: {(props.trending[5].item.price_btc*50955.076475927).toFixed(4)} USD</p>
                    <p>MarketCap Rank : {props.trending[5].item.market_cap_rank}</p>
                    <p>Coingecko Rank : {(props.trending[5].item.score)+1}</p>
                  </div>
                </div>
                </Link>
              </CardActionArea> 
              </div>

              <div  className='col-lg-3 h-100 col-md-6 col-sm-6 col-12'>
              <CardActionArea sx={{height:'100%'}}>
              <Link className='special-links' to={`/coindata/${props.trending[6].item.id}`} >
                <div className='card overflow-hidden text-white  rounded-5 resttop_coins shadow-lg rest_coin_cards'>
                <Avatar className='shadow-lg'  sx={{width:{lg:80, md:60, sm:50}, height:{lg:80, md:60, sm:50},marginLeft:"auto", marginRight:"auto", marginBottom:2}} src={props.trending[6].item.large}/>
                  <div className='rest_coin_details'> 
                    <p className='rest_coin_name'>{props.trending[6].item.name}</p>
                    <p>Price: {(props.trending[6].item.price_btc*50955.076475927).toFixed(4)} USD</p>
                    <p>MarketCap Rank : {props.trending[6].item.market_cap_rank}</p>
                    <p>Coingecko Rank : {(props.trending[6].item.score)+1}</p>
                  </div>
                </div>
                </Link>
              </CardActionArea>   
              </div>

            </div>
          </div>   
           
          <div className='container' >
          
            <div><h2 className="pb-2 section-heading-2" style={{color:"white", fontSize:50, textAlign:"center"}}>Cryptocurrency Prices by Market Cap</h2></div>

            <div className='twrap table-responsive'>
            <table style={{width:"100%"}}>
                <thead>
                <tr className='table_content_heading'>
                  <th style={{width:'5%', padding:20, borderTopLeftRadius:10, borderBottomLeftRadius:10}} >#</th>
                  <th style={{width:'15%', padding:20}} >Coin</th>
                  <th style={{width:'5%', padding:20,textAlign:"left"}}></th>
                  <th style={{width:'15%', padding:20, textAlign:"right"}} >Price</th>
                  <th style={{width:'10%', padding:20, textAlign:"right"}} >1h</th>
                  <th style={{width:'10%', padding:20, textAlign:"right"}} >24h</th>
                  <th style={{width:'10%', padding:20, textAlign:"right"}} >7d</th>
                  <th style={{width:'15%', padding:20, textAlign:"right"}} >24h volume</th>
                  <th style={{width:'20%', padding:20,borderTopRightRadius:10, borderBottomRightRadius:10, textAlign:"right"}} >Mkt Cap</th>
                </tr>
                </thead>

                {paginatedList?.map((coin,index) =>  { return (
                  <tbody key={index}>
                  <tr className='table_content'>
                  <td style={{display:'flex', width:'5%', padding:20, whiteSpace:"nowrap", justifyContent:"center", alignItems:'center'}} >{currentUser?.watchlist?.includes(coin.id) ? <IconButton  onClick={()=> handleRemoveCoin(coin.id)}><StarIcon  sx={{color:"gold"}}/></IconButton> : <IconButton onClick={()=> handleAddCoin(coin.id)}><StarOutlineIcon  sx={{color:"gray"}}/></IconButton>}{coin.market_cap_rank}</td>
                  <td style={{width:'15%', padding:20, whiteSpace:"nowrap", justifyContent:"center", textAlign:"left"}} ><Avatar sx={{width:25, height:25, marginRight:2, display:"inline-block", verticalAlign:"middle"}} alt='coin-logo' src={coin.image}/><Link className='special-links-2' to={`/coindata/${coin.id}`}>{coin.name}</Link></td>
                  <td style={{width:'5%', padding:20, whiteSpace:"nowrap", justifyContent:"center", textAlign:"left"}}><span style={{fontSize:"small", float:"right", marginRight:10}}>{(coin.symbol).toUpperCase()}</span></td>
                  <td style={{width:'15%', padding:20, whiteSpace:"nowrap", justifyContent:"center", textAlign:"right"}} >$ {coin.current_price}</td>
                  {(coin.price_change_percentage_1h_in_currency)< 0 ? (<td style={{width:'10%', padding:20, whiteSpace:"nowrap", color:"#c62f2d", textAlign:"right"}} >{(coin.price_change_percentage_1h_in_currency)?.toFixed(1)} %</td>) : (<td style={{width:'10%', padding:20, whiteSpace:"nowrap",color:"#96d800", textAlign:"right"}} >{(coin.price_change_percentage_1h_in_currency).toFixed(1)} %</td>)}
                  {(coin.price_change_percentage_24h_in_currency)< 0 ? (<td style={{width:'10%', padding:20, whiteSpace:"nowrap", color:"#c62f2d", textAlign:"right"}} >{(coin.price_change_percentage_24h_in_currency)?.toFixed(1)} %</td>) : (<td style={{width:'10%', padding:20, whiteSpace:"nowrap",color:"#96d800", textAlign:"right"}} >{(coin.price_change_percentage_24h_in_currency).toFixed(1)} %</td>)}
                  {(coin.price_change_percentage_7d_in_currency)< 0 ? (<td style={{width:'10%', padding:20, whiteSpace:"nowrap", color:"#c62f2d", textAlign:"right"}} >{(coin.price_change_percentage_7d_in_currency)?.toFixed(1)} %</td>) : (<td style={{width:'10%', padding:20, whiteSpace:"nowrap",color:"#96d800", textAlign:"right"}} >{(coin.price_change_percentage_7d_in_currency).toFixed(1)} %</td>)}
                  <td style={{width:'15%', padding:20, whiteSpace:"nowrap", justifyContent:"center", textAlign:"right"}} >$ {(coin.total_volume).toLocaleString('en')}</td>
                  <td style={{width:'20%', padding:20, whiteSpace:"nowrap", justifyContent:"center", textAlign:"right"}} >$ {(coin.market_cap).toLocaleString('en')}</td>
                </tr>
                </tbody>)
                })}
                
            </table>
            
            </div>
            <nav className='d-flex justify-content-center p-4'>
              <ul className='pagination'>
                {pages.map((page, index)=> (<li key={index} onClick={()=> pagination(page)} className={page === currentPage ? 'page-item-active page-link' : 'page-item page-link'}>{page}</li>))}
              </ul>
            </nav>
            </div> 

            {handleAlerts(msg, type)}

        </div>
    )
}

export default Home
