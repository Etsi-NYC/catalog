import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="list-item-container">
        <a
          className="list-item-link"
          href={'/listing/' + this.props.item.item_id}
        >
          <div className="picture-container-with-padding">
            <div className="picture-container">
              <img
                className="item-image"
                src={this.props.item.item_thumbnail}
              />
            </div>
          </div>
          <div className="text-container-with-padding">
            <div className="text-container">
              <p className="item-title">{this.props.item.title}</p>
              <p className="item-price">
                <span className="currency">$</span>
                <span className="price">{this.props.item.price}</span>
                <span className="free-shipping-wrapper">
                  <span className="free-shipping-text">Free Shipping</span>
                </span>
              </p>
            </div>
          </div>
        </a>
      </li>
    );
  }
}

export default ListItem;
