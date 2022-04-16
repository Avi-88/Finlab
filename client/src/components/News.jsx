import React, {useState, useEffect} from 'react'
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import Loading from './Loading';

const News = () => {

    const [news, setNews] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const options = {
        method: 'GET',
        url: 'https://free-news.p.rapidapi.com/v1/search',
        params: {q: 'crypto', lang: 'en'},
        headers: {
          'x-rapidapi-host': 'free-news.p.rapidapi.com',
          'x-rapidapi-key': '55ad27a803mshe899048180106c4p142cbejsn5e1ee9723d45'
        }
      };
      const getItems =  async (o) =>{
        const result = await axios.request(options).catch(function (error) {
          alert("There was an error: " + error);
        });
        
  
        setNews(result.data.articles)
        setLoading(false) 
      }
      getItems()
      }, []);



    return isLoading ?(
      <Loading/>
    ) : (
        <div className='news-main'>
        <div className='container news-div'>

        <div ><h2 className="pb-2 section-heading" style={{color:"white", fontSize:50, textAlign:"center"}}>Trending News Articles</h2></div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-3 news_article news-info">
            
                {news.map((article,index) =>  { return (
               
               <div className="col " key={index}>
                   
                   <div className="card shadow-sm article-card">
                   <CardActionArea>
                     <img style={{backgroundColor:"#0D7377"}} className="bd-placeholder-img card-img-top" width="100%" height="225" src={article.media}  aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"></img>

                     <div style={{position:"relative"}} className="card-body">
                       <span className='article-category'>{article.topic}</span>
                       <p className="article-title">{article.title}</p>
                       <p className="card-text article-text">{(article.summary).substring(0,100)}...</p>
                       <div className="d-flex justify-content-between align-items-center">
                         <div className="btn-group">
                           <a target={"_blank"} rel='noreferrer' href={article.link} className="stretched-link accent_text">View</a>
                 
                         </div>
                         <small>{article.published_date}</small>
                       </div>
                     </div>
                     </CardActionArea>
                   </div>
                   
                 </div>)
               })}


            </div>
        </div>
        </div>
    )
}

export default News
