// import css from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <li>
      <div onClick={onClick}>
        <img src={image.urls.small} alt={image.urls.description} />
      </div>
    </li>
  );
};

export default ImageCard;
