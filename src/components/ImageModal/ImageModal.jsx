import Modal from "react-modal";

function ImageModal({ isOpen, onClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      contentLabel="Image Modal"
    >
      <div>
        {image && image.urls.regular && image.alt_description && (
          <img src={image.urls.regular} alt={image.alt_description} />
        )}
        {!image && <p>No image available</p>}
      </div>
    </Modal>
  );
}

export default ImageModal;
