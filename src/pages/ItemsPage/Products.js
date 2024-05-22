import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import favoriteIcon from "../../assets/favorite-icon.svg";

function ProductListItem({ item, imageStyle }) {
  const { id, images, name, price, favoriteCount } = item;
  const formatPriceWithCommas = (price) => {
    return price.toLocaleString("en-US");
  };
  return (
    <Link className="Link" to={`/items/${id}`}>
      <div className="ProductListItem ">
        <img className={imageStyle} src={images} alt={imageStyle} />
        <div>
          <p className="product-title">{name}</p>
          <p className="product-price">{formatPriceWithCommas(price)}원</p>
          <div className="favorite-count">
            <img
              className="favorite-icon"
              src={favoriteIcon}
              alt="favorite icon"
            />
            <p>{favoriteCount}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
function Products({ items, type }) {
  const getItemStyle = (type) => {
    switch (type) {
      case "best":
        return "bestItemStyle";
      case "all":
        return "allItemImageStyle";
      default:
        return "";
    }
  };
  return (
    <ul className={`ProductList product-card ${type}`}>
      {items.map((item) => {
        const imageStyle = getItemStyle(type);
        return (
          <li className="ProductListItem" key={item.id}>
            <ProductListItem item={item} imageStyle={imageStyle} />
          </li>
        );
      })}
    </ul>
  );
}

export default Products;