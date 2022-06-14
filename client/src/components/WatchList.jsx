import React from 'react';
import { Link } from 'react-router-dom';
import {  Avatar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Legend , Tooltip , CategoryScale , scales} from 'chart.js';
import { useEffect , useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loading from './Loading';
import _ from 'lodash';


const WatchList = ({mainData}) => {

    const {user} = useContext(AuthContext);
    const [watchlistData, setWatchlistData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [paginatedList, setPaginatedList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5;

    const pageCount = watchlistData ? Math.ceil(watchlistData.length/pageSize) : 0;

    const pages = _.range(1, pageCount+1);

    const pagination = (pageNo) =>{
      setCurrentPage(pageNo);
      const startIndex = (pageNo - 1)*pageSize;
      const paginated = _(watchlistData)?.slice(startIndex).take(pageSize).value();
      setPaginatedList(paginated);
    };


    useEffect(()=>{
        const fetchWatchList = async()=> {
           const coins = await user.watchlist; 
           const res = await mainData.filter((x)=> coins?.includes(x.id));
           setWatchlistData(res);
           setLoading(false);
        }
        fetchWatchList();
    },[user, mainData]);

    useEffect(()=>{
        setPaginatedList(_(watchlistData)?.slice(0).take(pageSize).value());
      },[watchlistData]);



    ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip , scales);

    const options = {
        scales:{
            y: {
                display : false, 
                },
            x:{
                display : false,
            }    
        },
        
        plugins: {
            legend: {
                display: false,
                labels: {
                  display: false
                }
              },
            Tooltip:{
                display: false,
            }
          }
      }


    return isLoading ? (<Loading/>) : (
        <div className='container px-4 py-5 watchlist-div'>
            <p className='watchlist-title'>Your Watchlist</p>

            <div className='container'>
                {paginatedList?.map((coin, index)=>{ return (
                    <div key={index} className='container px-4 py-5'>
                    <div className='row card-watchlist align-items-stretch g-4 watchlist-card'>
                    <div className='info-icon'>
                        <Link to={`/coindata/${coin.id}`}>
                            <IconButton >
                                <InfoIcon sx={{color:'#14FFEC'}}/>
                            </IconButton>
                        </Link>
                    </div>
                    <div className='coin-avatar-title col-lg-4 col-md-6 col-12'>
                        <Avatar className='shadow-lg' sx={{width:{lg:120, md:100, sm:80, xs:80}, height:{lg:120, md:100, sm:80, xs:80}, marginRight:4}} src={coin.image}/>
                        <div>
                            <p>{coin.name} ({(coin.symbol).toUpperCase()})</p>
                            <p>$ {coin.current_price}</p>
                            <p>{coin.market_cap_change_percentage_24h} %</p>
                        </div>
                    </div>
                    <div className='coin-watch-info col-lg-4 col-md-6 col-12'>
                        <p>Market Cap : $ {coin.market_cap}</p>
                        <p>24H HIGH: $ {coin.high_24h}</p>
                        <p>24H LOW: $ {coin.low_24h}</p>
                        <p>TOTAL VOL: $ {coin.total_volume}</p>
                    </div>
                    <div className='watchcoin-chart col-lg-4 col-md-12 col-12'>
                        <Line data={{
                            labels: coin?.sparkline_in_7d?.price?.map(data=> data),
                            datasets: [
                              {
                                label:'Price in USD',  
                                data: coin?.sparkline_in_7d?.price?.map(data=> data),
                                fill:false,
                                pointRadius: 0,
                                spanGaps: true,
                                tension: 0.2,
                                backgroundColor:'#00FFF5',
                                borderColor:'#00FFF5'
                              }
                            ],
                            }} options={options}/>
                    </div>
                    </div>   
                    </div>)
                })}
            </div>

            <nav className='d-flex justify-content-center p-4'>
              <ul className='pagination'>
                {pages.map((page, index)=> (<li key={index} onClick={()=> pagination(page)} className={page === currentPage ? 'page-item-active page-link' : 'page-item page-link'}>{page}</li>))}
              </ul>
            </nav>
        </div>
    )
}

export default WatchList
