import "./ItemCarousel.css";

const ItemCarousel = (props) => {
  return (
    <div className="product__carousel__container">
      <div className="product__carousel">
        <div className="carousel__image__container">
          <img
            className="carousel__image"
            src={"data:image/jpg;base64," + props.image}
            alt="item"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCarousel;
