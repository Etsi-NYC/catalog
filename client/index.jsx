import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ListItem from './Components/listitem.jsx';


class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: {},
      items: []
    };
    this.get = this.get.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  componentDidMount() {
    var id = window.location.pathname.slice(9);
    this.get(`http://3.16.22.69/product/${id}`, this.loadItems);
  }

  get(url, callback) {
    axios
      .get(url)
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        console.log(error.response, 'error from axios get request');
      });
  }

  loadItems(response) {
    if (response === 'error') {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        seller: response.seller,
        items: response.items,
        span: 'in'
      });
    }
  }

  render() {
    if (this.state.error === true) {
      return <div className="catalog-outer-container">INVALID PRODUCT</div>;
    } else {
      return (
        <div className="catalog">
          <div className="catalog-outer-container">
            <div className="catalog-header">
              <a href={'/listing/' + window.location.pathname.slice(9)} className="header-link">
                <div className="thumbnail-catalog">
                  <img src={this.state.seller.avatar} />
                </div>
                <div className="catalog-store-name">{this.state.seller.name}</div>
              </a>
              <div className="catalog-store-location">
                <span className="catalog-span">{this.state.span}</span>
                {this.state.seller.location}
              </div>
              <div className="store-marketing" />
            </div>
            <div className="item-list">
              <ul className="item-table">
                {this.state.items.map(item => {
                  return <ListItem key={item.item_id} item={item} />;
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

// ReactDOM.render(<Catalog />, document.getElementById('catalog'));

window.Catalog = Catalog;