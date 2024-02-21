import './UserProfileCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
/**
 * 
 * @param {string} id
 * @param {string} name
 * @param {string} email 
 * @param {function} phone
 * @param {object} picture
 * @param {object} location
 * @param {function} editUserHandler
 * @returns {JSX.Element} UserProfileCard component
 */
const UserProfileCard = ({ id,name, email, phone, picture,location, editUserHandler }) => {
    return (
        <div className="card">
            <div className="edit-icon" onClick={(e)=>editUserHandler(id)}>
            <FontAwesomeIcon icon={faUserPen} />
            </div>
            <div className="name">{name.first} {name.last}</div>
            <div className="profile-pic">
                <img src={picture.thumbnail} alt={`${name.first}_${name.last}`}/>
            </div>
            <div className="details">
                <div className="info">{email}</div>
                <div className="info">{phone}</div>
                <div className="info">{location.city}, {location.state}</div>
            </div>
        </div>
    );
}

export default UserProfileCard;