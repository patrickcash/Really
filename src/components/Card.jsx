import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { addCommasToNumber } from '../utils/numberUtils';

function Card(props) {
    

    return (
        <div className='card'>
            <h3 className='card__title'>{props.title}</h3>
            <div className='card__header'>
                <img className='card__header__photo' src={props.photo_main} alt='House' />
            </div>
            <p className='card__location'>{props.address}, {props.city}, {props.state}</p>
            <div className='row'>
                <div className='col-2-of-3'>
                    <p className='card__info'>Price: ${addCommasToNumber(props.price)}</p>
                    <p className='card__info'>Bedrooms: {props.bedrooms}</p>
                    <p className='card__info'>Bathrooms: {props.bathrooms}</p>
                </div>
                <div className='col-1-of-3'>
                    <p className='card__saletype'>{props.sale_type}</p>
                    <p className='card__hometype'>{props.home_type}</p>
                    <p className='card__sqft'>Sqft: {props.sqft}</p>
                </div>
            </div>
            <Link className='card__link' to={`/listings/${props.slug}`}>View Listing</Link>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    photo_main: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.string.isRequired,
    sale_type: PropTypes.string.isRequired,
    home_type: PropTypes.string.isRequired,
    sqft: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
}

export default Card
