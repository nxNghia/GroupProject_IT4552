import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const BrowseView = ({ view, viewType, token, fetchPlaylistSongs, updateHeaderTitle, addPlaylistItem, fetchGenre, updateViewType, uPlaylists = [] }) => {

    let browseView;

    if (view && viewType !== 'uPlaylist') {

        browseView = view.map((item, i) => {

            const getPlaylistSongs = () => {
                addPlaylistItem(item);
                fetchPlaylistSongs(item.owner.id, item.id, token);
                updateHeaderTitle(item.name, item.id)
            };

            const getGenre = () => {
                fetchGenre(token, item.id)
                updateViewType('Featured')
            }

            return (
                <li onClick={viewType === 'Featured' || viewType === 'uPlaylist' ? getPlaylistSongs : viewType === 'Genres' ? getGenre : null} className='category-item' key={i}>
                    <div className='category-image'>
                        <img alt="category" src={item.icons ? item.icons[0].url : item.images[0].url} />
                            {viewType === 'Genres' && (
                                <p className='category-name'>{item.name}</p>
                            )}
                    </div>
                </li>
            );
        });
    }else{
        if(viewType === 'uPlaylist') {
            browseView = uPlaylists.map((item, i) => {

                const getPlaylistSongs = () => {
                    addPlaylistItem(item);
                    updateHeaderTitle(item.name, item._id);
                    updateViewType('playlist')
                };
    
                return (
                    <li onClick={getPlaylistSongs} className='category-item' key={i}>
                        <div className='category-image'>
                            <img alt="category" src={item.owner.images[0].url} />
                            <p className='category-name'>{item.name}</p>
                            <p className='category-owner-name'>{item.owner.display_name}</p>
                        </div>
                    </li>
                );
            });
        }
    }

    return (
        <ul className='browse-view-container'>
            {browseView}
        </ul>
    );
};


BrowseView.propTypes = {
  view: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  viewType: PropTypes.string,
  token: PropTypes.string,
  fetchPlaylistSongs: PropTypes.func,
  updateHeaderTitle: PropTypes.func,
  addPlaylistItem: PropTypes.func
};

export default BrowseView;
