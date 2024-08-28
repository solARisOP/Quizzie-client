import './index.css'

const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-layout">
            <div className="modal-main-layout" ></div>
            {children}
        </div>
    );
};

export default Modal;