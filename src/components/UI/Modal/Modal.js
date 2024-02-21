import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({title,icon, onClose, children})=>{ 
    return (
        <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2> <FontAwesomeIcon icon={icon} /> {title.toUpperCase()}</h2>
            
            <span className="close-btn" onClick={onClose}>X</span>
          </div>
          <hr />
          <div className="modal-content">
            {children}
          </div>
          
        </div>
      </div>
  
    );
}

export default Modal;