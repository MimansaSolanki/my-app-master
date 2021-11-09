import './App.css';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useState, useEffect } from 'react';
import Axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasmore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => (getItems()), []);

  const options = {
    method: 'GET',
    headers: {
      X_COUNTRY: "AE",
      X_VEHICLE_TYPE: "CAR"
    },
  };
  const getItems = async (page) => {
    Axios.get(`https://listing-service.qac24svc.dev/v1/vehicle?sf=city:DU_DUBAI&size=25&spath=buy-used-cars-dubai&variant=filterV3&page=${page}`, options)
      .then((response) => {
        setHasmore(false);
        setItems([...items, ...response.data.results]);
      });
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand " href="https://consumer-web-ae.qac24svc.dev/ae"><img className="logo" src="https://consumer-web-ae.qac24svc.dev/ae/static/js/42a884476ab8ee4a3642ef07389f1a63.svg" alt="logo" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="https://consumer-web-ae.qac24svc.dev/ae/faq">FAQ</a>
              </li>
              <li className="_1inZ-">
                <a href="tel:042909641" className="_2VLDK">042909641</a><small>  8am - 10pm </small>
              </li>
            </ul>

          </div>
        </div>
      </nav>
      <div className="container1"><div className="_1_rE8"><nav aria-label="breadcrumb"><ul className="breadcrumb"><li className="breadcrumb-item"><a>Home</a></li><li className="breadcrumb-item">Used Cars in Dubai</li></ul></nav></div></div>
      <form className="d-flex">
        <input className="form-control me-2" type="text" placeholder="Find your dream car with us" aria-label="Search" 
          onChange = {event => {setSearchTerm(event.target.value)}}
        />
      </form>
      <h1 className="qf_dm">Used Cars In Dubai</h1>
      <InfiniteScroll
        pageStart={0}
        loadMore={getItems}
        hasMore={true || false}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.filter((item) => {
          if (searchTerm == "") {
            return item
          } else if (item.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     item.model.toLowerCase().includes(searchTerm.toLowerCase()) ) {
            return item
          }
        }).map((item) => {
          return <div className="cars">
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`https://fastly-production.24c.in/${item.mainImage.path}`}
                />
                <CardContent>
                  <Typography className="heart">
                    <img src="https://consumer-web-ae.qac24svc.dev/ae/static/js/e8333986534ba8a423ce86582be0003d.svg" />
                  </Typography>
                  <Typography gutterBottom>
                    <h4>{item.year} {item.make} {item.model}</h4>
                    <h6><b>{item.variant}</b> |<span>  GCC Specifications</span></h6>
                    <br/>
                  </Typography>
                  
                  <Typography>
                    <img src="https://consumer-web-ae.qac24svc.dev/ae/static/js/15bbe7d4f9e51f5043535857c52d7336.svg" />
                    <span> {item.odometerReading} km</span>
                    <div className="cyl">
                      <img src="https://consumer-web-ae.qac24svc.dev/ae/static/js/5570637da94bead30f0c65f9faca1c5e.svg" />
                      <span>{item.noOfCylinders}cyl{item.engineSize}L </span>
                    </div>
                    <hr />
                    <div className="_3aEWp">
                      <div className="_3SXwZ"><strong>AED {item.emiDetails.emi}<span>/month</span></strong></div>
                      <div className="aApXW cyl"><span>AED {item.price}</span></div>
                    </div>
                    <br />
                    <span className="_2xBAf">{item.emiDetails.downPayment} Downpayment</span>
                    <span className="_2xBAg cyl">AED {item.discountAmount}</span>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        })
        }
      </InfiniteScroll>
    </div>

  );
}

export default App;