import { useEffect } from 'react';
import { createFollow } from '../../actions/friendActions';
import FriendItem from './FriendItem';
import { Modal, Button } from '@material-ui/core'

const FriendList = ({
    other_users = [],
    id,
    fetchFriendsList,
    fetchFriendInfo,
    updateHeaderTitle,
    updateViewType,
    miniTitle,
    friendList,
    following,
    addFollowing,
    followedPlaylist,
    beingFollowed,
    raise_report_modal,
    report_message,
    reportBegin,
    reportConfirm,
    reportId
}) => {
    const getList = () => {
        // if (miniTitle === 'You May Know' || miniTitle === 'Follow You')
        // {
        //     return other_users.filter(user => (!friendList.some(friend => friend.friendId === user.token) && !following.some(id => id === user.token)))
        // }else{
        //     return following.map(id => other_users.find(user => user.token === id))
        // }

        switch (miniTitle)
        {
            case 'You May Know':
                return other_users.filter(user => (!friendList.some(friend => friend.friendId === user.token) && !following.some(friend => friend.token === user.token)))

            case 'Follow You':
                return beingFollowed

            case 'Following':
                return following

            default: return []
        }
    }

    return (
        <>
            <h4>{miniTitle}</h4>
            <div className='friends-view'>
            {getList().map((user, index) => {
                return (
                    <FriendItem
                        key={user.token}
                        user={user}
                        addFollowing={addFollowing}
                        createFollow={createFollow}
                        fetchFriendInfo={fetchFriendInfo}
                        updateHeaderTitle={updateHeaderTitle}
                        updateViewType={updateViewType}
                        following={following}
                        reportBegin={reportBegin}
                        id={id}
                        followed={miniTitle === 'Following' ? true : false}
                    />
                )
            })}
            </div>
            <Modal
                open={raise_report_modal}
                onClose={() => reportBegin(false)}
            >
                <div className='report-modal'>
                    <h3>{report_message}</h3>
                    <div>
                        {report_message === 'Confirm report' && <Button color='primary' variant='contained' onClick={() => reportConfirm(reportId)}>Confirm</Button>}
                        <Button color='primary' variant='contained' onClick={() => reportBegin(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FriendList;