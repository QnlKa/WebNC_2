import "./Description.css";

const Description = (props) => {
  return (
    <div className="product__description__product">
      <div className="description__header__container">
        <div className="description__header__line"></div>
        <div className="description__header">Details</div>
      </div>
      <div className="description__detail__container"></div>
      <div className="description__specifics__container">
        <div className="description__specifics">{props.item}</div>
      </div>
    </div>
  );
};

export default Description;
