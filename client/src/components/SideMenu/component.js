import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const SideMenu = ({
    updateHeaderTitle,
    updateViewType,
    fetchCategories,
    fetchRecentlyPlayed,
    fetchSongs,
    fetchAlbums,
    fetchArtists,
    token,
    title,
    artistIds,
    userId,
    blocked
}) => {
    const handleClick = name => {
        if (!blocked)
        {
            updateHeaderTitle(name);
            updateViewType(name);
        }
    };

    const handleBrowseClick = () => {
        if (!blocked)
        {
            updateHeaderTitle("Browse");
            updateViewType("Genres");
            fetchCategories(token);
        }
    };

    const renderSideMenu = () => {
        const menu = [
            {
                name: "Songs",
                action: fetchSongs,
                getSongs: true
            },
            {
                name: "Playlists",
                action: fetchAlbums
            }
        ];

        return menu.map(item => {
            return (
                <li
                    key={item.name}
                    className={
                        title === item.name ? "active side-menu-item" : "side-menu-item"
                    }
                    onClick={() => {
                        if (!blocked)
                        {
                            item.getArtists
                            ? item.action(token, artistIds)
                            : item.getSongs
                            ? item.action(token, userId)
                            : item.action(token);
                            handleClick(item.name);
                        }
                    }}
                >
                    {item.name}
                </li>
            );
        });
    };

    return (
        <ul className="side-menu-container">
            <li
                onClick={handleBrowseClick}
                className={
                    title === "Browse" ? "active side-menu-item" : "side-menu-item"
                }
            >
                Browse
            </li>
            <h3 className="user-library-header">Your Library</h3>
            {renderSideMenu()}
        </ul>
    );
};

SideMenu.propTypes = {
    updateHeaderTitle: PropTypes.func,
    updateViewType: PropTypes.func,
    fetchFeatured: PropTypes.func,
    fetchRecentlyPlayed: PropTypes.func,
    fetchSongs: PropTypes.func,
    fetchAlbums: PropTypes.func,
    fetchArtists: PropTypes.func,
    token: PropTypes.string,
    artistIds: PropTypes.string,
    title: PropTypes.string
};

export default SideMenu;
