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
                className="list-item-image"
                src={this.props.item.item_thumbnail}
              />
            </div>
          </div>
          <div className="text-container-with-padding">
            <div className="list-item-text-container">
              <p className="list-item-item-title">{this.props.item.title}</p>
              <p className="list-item-item-price">
                <span className="list-item-currency">$</span>
                <span className="list-item-price">{this.props.item.price}</span>
                <span className="list-item-free-shipping-wrapper">
                  <span className="list-item-free-shipping-text">Free Shipping</span>
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
