import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ListingForm from '../components/ListingForm';
import Listings from '../components/Listings';
import Pagination from '../components/Pagination';


export default function Home() {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage, setListingsPerPage] = useState(3);
  const [active, setActive] = useState(1);

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

  const visitPage = (page) => {
    setCurrentPage(page);
    setActive(page);
  };

  const previous_number = () => {
      if (currentPage !== 1) {
          setCurrentPage(currentPage-1);
          setActive(currentPage-1);
      }
  };

  const next_number = () => {
      if (currentPage !== Math.ceil(listings.length/listingsPerPage)) {
          setCurrentPage(currentPage+1);
          setActive(currentPage+1);
      }
  };

  return (
    <main className='home'>
      <Helmet>
        <title>Really - Home</title>
        <meta
          name='description'
          content='Really Estate Home Page'
        />
      </Helmet>
      <section className='home__form'>
        <ListingForm setListings={setListings} />
      </section>
      <section className='home__listings'>
        <Listings listings={currentListings} />
      </section>
      <section className='home__pagination'>
        {
          listings.length !== 0 ? (
            <div className='row'>
              <Pagination
                itemsPerPage={listingsPerPage}
                count={listings.length}
                visitPage={visitPage}
                previous={previous_number}
                next={next_number}
                active={active}
                setActive={setActive}
              />
              <div>
                <label className='home__label' htmlFor='listingPerPage'>Listings Per Page</label>
                <select className='home__select' name='listingPerPage' onChange={
                    e => setListingsPerPage(parseInt(e.target.value))
                  } value={listingsPerPage}>
                  <option>3</option>
                  <option>6</option>
                  <option>9</option>
                  <option>12</option>
                  <option>15</option>
                </select>
              </div>
              </div>
          ) : null
        }        
      </section>
    </main>
  );
}
