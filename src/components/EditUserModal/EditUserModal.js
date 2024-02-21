import './EditUserModal.css';
import Modal from '../UI/Modal/Modal';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
const EditUserModal = ({ onClose, selectedUser }) => {

    const [editUser, setEditUser] = useState({});
    
    /**
     * triggers when controlled form input value changes
     * @param {*} e 
     */
    const changeInputHandler = (e) => {
        // Check the input type is a file or not
        if (e.target.type === 'file') {
            const thumbnail = URL.createObjectURL(e.target.files[0]);
            // Update the state with the new values
            setEditUser(prev => ({
                ...prev,
                thumbnail
            }));
        } else {
            const { name, value } = e.target;
            // Update the state with the new values
            setEditUser(prev => ({
                ...prev,
                [name]: value
            }));
        }

    };
    
    /**
     * set initial user values for the editUser object
     */
    const setInitialUserValues = () => {
        const { id, name: { first, last }, location: { city, state }, phone, email, picture: { thumbnail } } = selectedUser;
        setEditUser({
            id,
            first,
            last,
            city,
            state,
            phone,
            email,
            thumbnail
        })
    }

    /**
     * reset the form to the initial state
     * @param {Event} e 
     */
    const resetHandler = (e) => {
        setInitialUserValues();
    }

    /**
     * triggers when submit the form
     * @param {Event} e 
     */
    const onSubmitHandler = (e) => {
        e.preventDefault();
        onClose(editUser);
    }

    
    // set initial editUser value in componentDidMount 
    useEffect(() => {
        setInitialUserValues();
    }, []);

    return (
        <Modal onClose={(e) => onClose()} title="Edit User" icon={faUserPen}>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail Image:</label>
                    <input type="file" id="thumbnail" name="thumbnail" accept="image/*" onChange={changeInputHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="first-name">First Name:</label>
                    <input type="text" id="first-name" name="first" value={editUser.first} onChange={changeInputHandler} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Last Name:</label>
                    <input type="text" id="last-name" name="last" value={editUser.last} onChange={changeInputHandler} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" value={editUser.city} onChange={changeInputHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input type="text" id="state" name="state" value={editUser.state} onChange={changeInputHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={editUser.phone} onChange={changeInputHandler} />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-button">
                        Save Changes
                    </button>
                    <button type="button" onClick={resetHandler} className="clear-button">
                        Reset Changes
                    </button>
                </div>

            </form>
        </Modal>
    );
}

export default EditUserModal;