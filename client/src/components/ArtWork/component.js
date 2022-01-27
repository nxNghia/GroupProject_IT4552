import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { useSelector } from 'react-redux';

const ArtWork = ({albumImage}) => {
    return <div className='album-artwork-container'>
    {
        albumImage && <img alt="artwork" className='album-artwork' src={albumImage} />
    }
    </div>
};


ArtWork.propTypes = {
    albumArtwork: PropTypes.string
};

export default ArtWork;
