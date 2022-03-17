import React from 'react'
import PropTypes from 'prop-types'

function Pagination({ itemsPerPage, count, active, visitPage, previous, next }) {
    const getPageNumbers = () => {
        let numbers = [];
        let pageNumber = 1;

        for (let i = 0; i < count; i += itemsPerPage) {
            const page = pageNumber;
            let style = 'pagination__number';
            let content = null;

            if (active === page) {
                style = 'pagination__number pagination__number--active';
                content = (
                    <div key={i} className={style}>
                        {pageNumber}
                    </div>
                );
            }
            else {
                content = (
                    <div key={i} onClick={() => visitPage(page)} className={style}>
                        {pageNumber}
                    </div>
                );
            }

            numbers.push(
                content
            );
            pageNumber++;
        }

        return numbers;
    };

    return (
        <div className='pagination'>
            <div onClick={() => previous()} className='pagination__number'>
                Previous
            </div>
            {getPageNumbers()}
            <div onClick={() => next()} className='pagination__number'>
                Next
            </div>
        </div>
    );
}

Pagination.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    visitPage: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
};

export default Pagination
