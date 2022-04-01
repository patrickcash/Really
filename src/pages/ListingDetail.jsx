import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { addCommasToNumber } from '../utils/numberUtils';

export default function ListingDetail(props) {
  let { id } = useParams();
  const [listing, setListing] = useState({});
  const [realtor, setRealtor] = useState({});
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    axios.get(`${process.env.REACT_APP_API_URL}/api/listings/${id}`, config)
    .then(res => {
        setListing(res.data);
        setPrice(addCommasToNumber(res.data.price));
    })
    .catch(err => {

    });
  }, [id]);

  useEffect(() => {
    const id = listing.realtor;

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    if (id) {
        axios.get(`${process.env.REACT_APP_API_URL}/api/realtors/${id}`, config)
        .then(res => {
            setRealtor(res.data);
        })
        .catch(err => {

        });
    }
  }, [listing.realtor]);

  const displayAdditionalImages = () => {
    let images = [];
    let result = [];

    for(let i = 1; i < 21; i++){
      if(listing[`photo_${i}`]){
        images.push(
          <div className='listingdetail__display'>
            <img className='listingdetail__display__image' src={listing[`photo_${i}`]} alt='' />
          </div>
        );
      }
    }

    for (let i = 0; i < images.length; i += 3) {
      result.push(
          <div className='row' key={i}>
              <div className='col-1-of-3'>
                  {images[i]}
              </div>
              <div className='col-1-of-3'>
                  {images[i+1] ? images[i+1] : null}
              </div>
              <div className='col-1-of-3'>
                  {images[i+2] ? images[i+2] : null}
              </div>
          </div>
      );
    }

    return result;
  }
  return (
    <div className='listingdetail'>
      <Helmet>
          <title>Really Estate - Listing | {`${listing.title}`}</title>
          <meta
              name='description'
              content='Listing detail'
          />
      </Helmet>
      <div className='listingdetail__header'>
        <h1 className='listingdetail__title'>{listing.title}</h1>
        <p className='listingdetail__location'>{listing.city}, {listing.state}, {listing.zipcode}</p>
      </div>
      <div className='row'>
        <div className='listingdetail__breadcrumb'>
          <Link className='listingdetail__breadcrumb__link' to='/'>Home</Link> / {listing.title}
        </div>
      </div>
      <div className='row'>
        <div className='col-3-of-4'>
          <div className='listingdetail__display'>
              <img className='listingdetail__display__image' src={listing.photo_main} alt='' />
          </div>
        </div>
        <div className='col-1-of-4'>
          <div className='listingdetail__display'>
            <img className='listingdetail__display__image' src={realtor.photo} alt='' />
          </div>
          <h3 className='listingdetail__realtor'>{realtor.name}</h3>
          <p className='listingdetail__contact'>{realtor.phone}</p>
          <p className='listingdetail__contact'>{realtor.email}</p>
          <p className='listingdetail__about'>{realtor.description}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-1-of-2'>
          <ul className='listingdetail__list'>
            <li className='listingdetail__list__item'>Home Type: {listing.home_type}</li>
            <li className='listingdetail__list__item'>Price: ${price}</li>
            <li className='listingdetail__list__item'>Bedrooms: {listing.bedrooms}</li>
            <li className='listingdetail__list__item'>Bathrooms: {listing.bathrooms}</li>
            <li className='listingdetail__list__item'>Square Feet: {listing.sqft}</li>
          </ul>
        </div>
        <div className='col-1-of-2'>
          <ul className='listingdetail__list'>
            <li className='listingdetail__list__item'>Sale Type: {listing.sale_type}</li>
            <li className='listingdetail__list__item'>Address: {listing.address}</li>
            <li className='listingdetail__list__item'>City: {listing.city}</li>
            <li className='listingdetail__list__item'>State: {listing.state}</li>
            <li className='listingdetail__list__item'>Zipcode: {listing.zipcode}</li>
          </ul>
        </div>
      </div>
      <div className='row'>
        <p className='listingdetail__description'>{listing.description}</p>
      </div>
      {displayAdditionalImages()}
    </div>
  )
}
