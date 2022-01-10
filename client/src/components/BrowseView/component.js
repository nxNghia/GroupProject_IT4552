import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const BrowseView = ({ view, viewType, token, fetchPlaylistSongs, updateHeaderTitle, addPlaylistItem, fetchGenre, updateViewType }) => {

    let browseView;

    if (view) {

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
                <li onClick={viewType === 'Featured' ? getPlaylistSongs : viewType === 'Genres' ? getGenre : null} className='category-item' key={i}>
                    <div className='category-image'>
                        <img alt="category" src={item.icons ? item.icons[0].url : item.images[0].url} />
                            {viewType === 'Genres' && (
                                <p className='category-name'>{item.name}</p>
                            )}
                    </div>
                </li>
            );
        });
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
