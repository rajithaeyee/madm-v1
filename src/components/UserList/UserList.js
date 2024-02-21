import { useEffect, useState } from 'react';
import UserProfileCard from '../UserProfileCard/UserProfileCard';
import UserFilter from '../UserFilter/UserFilter';
import EditUserModal from '../EditUserModal/EditUserModal';
import NoUsersFound from '../NoUsersFound/NoUsersFound';
import { sortBy as _sortBy } from 'lodash';
import './UserList.css';


const UserList = (props) => {
    const [userList, setUserList] = useState([]);
    const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [selectedUser, setSelectedUser] = useState({});

    /**
     * reset the filter results
     */
    const clearFiltersHandler = () => {
        setSearchKey('');
        setSortBy('');
    }

    /**
     * triggers when closing the edit modal
     * @param {object} editUser 
     */
    const onCloseEditUserModal = (editUser = null) => {
        if (editUser) {
            //update the selected user in local state
            setUserList(userList.map(user => {
                if (user.id.value === editUser.id.value) {
                    return {
                        ...selectedUser,
                        name: { ...selectedUser.name, first: editUser.first, last: editUser.last },
                        location: { ...selectedUser.location, city: editUser.city, state: editUser.state },
                        phone: editUser.phone,
                        email: editUser.email,
                        picture: {...selectedUser.picture, thumbnail: editUser.thumbnail}
                    }
                } else {
                    return user;
                }
            }));
        }
        //clear selected user
        setSelectedUser({});
        //close the modal
        setEditUserModalOpen(false);
    }

    // opens the edit user modal
    const editUserHandler = (id) => {
        const selectedUser = userList.find(user => user.id.value === id);
        if (selectedUser) {
            setSelectedUser(selectedUser);
            setEditUserModalOpen(true)
        }

    }

    //fetch data when componentDidMount
    useEffect(() => {
        //fetch users list from the server
        const fetchData = async () => {
            const url = `${process.env.REACT_APP_API_URL}/?results=${process.env.REACT_APP_API_FETCH_LIMIT}`;
            try {
    
                const response = await fetch(url);        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const { results } = await response.json();
                
                //sets the userList local state
                setUserList(results.filter(user => user.id.value)); // had to filter because some records send null ID from the backend
                
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                 
            }
        };
        fetchData();
    }, []);

    /**
     * 
     * @returns {object[]} Filtered UserList 
     */
    const getFilteredUserList = () => {
        const lowerSearchKey = searchKey.toLowerCase();
        const filteredUserList = _sortBy(userList.filter(user => user.name.first.toLowerCase().includes(lowerSearchKey) || user.name.last.toLowerCase().includes(lowerSearchKey) || user.email.toLowerCase().includes(lowerSearchKey) || user.location.city.toLowerCase().includes(lowerSearchKey) || user.location.state.toLowerCase().includes(lowerSearchKey)), [`name.${sortBy}`]);
        return filteredUserList.length > 0 ? filteredUserList.map(({ id, name, phone, picture, email, location }) => <UserProfileCard key={id.value} id={id.value} email={email} name={name} phone={phone} picture={picture} location={location} editUserHandler={editUserHandler} />) : <NoUsersFound />;
    }

    return (
        <div>
            <UserFilter setSearchKey={setSearchKey} searchKey={searchKey} sortBy={sortBy} setSortBy={setSortBy} clearFiltersHandler={clearFiltersHandler} />
            <div className="user-list-container">
                {
                    getFilteredUserList()
                }
            </div>
            {isEditUserModalOpen && <EditUserModal isOpen={isEditUserModalOpen} onClose={onCloseEditUserModal} selectedUser={selectedUser} />}
        </div>
    )
};

export default UserList;