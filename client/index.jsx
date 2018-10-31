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
    this.get('/not-items', this.loadItems);
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
      return <div className="outer-container">INVALID PRODUCT</div>;
    } else {
      return (
        <div className="catalog">
          <div className="outer-container">
            <div className="header">
              <a href={'/'} className="header-link">
                <div className="thumbnail">
                  <img src={this.state.seller.avatar} />
                </div>
                <div className="store-name">{this.state.seller.name}</div>
              </a>
              <div className="store-location">
                <span className="span">{this.state.span}</span>
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

ReactDOM.render(<Catalog />, document.getElementById('catalog'));