import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import InfiniteScroll from "react-infinite-scroll-component";
class City extends Component {
  constructor(props) {
    super(props);
    const { name } = props.match.params;
    this.state = {
      name,
      tours: [],
      page: 1,
      total: 15,
      count: 15,
      hasMore: true
    }
  }
  loadCityData = () => {
    const { name, page, count } = this.state;
    fetch(`http://tour.api.thetripguru.com/tours?filter[location.url]=${name.toLowerCase()}&limit=${count}&offset=${page}`, { mode: 'cors'})
      .then(res => res.json())
      .then(data => {        
        const tours = data.data.map((tour) => {
          const { summary, title, subtitle, description, media } = tour.attributes;
          const mediaUrl = Object.keys(media).find((mediaItem) => media[mediaItem].url && media[mediaItem].url !== "" );
          return {
            id: tour.id,
            title,
            subtitle,
            media: media[mediaUrl],
            summary,
            link: tour.links.self,          
          }
      });
      const { next, current } = data.meta.cursor;
      const { total } = data.meta;
      this.setState({
        page: next === null? current: next,
        hasMore: next === null? false: true,
        total,
        tours: this.state.tours.concat(tours)
      })
    }
    )
  }
  componentDidMount() {
    this.loadCityData(this.state.page);
  }

  render(){
    const { tours, hasMore, page } = this.state;
    const toursElements = tours.map((tour, index) => {
      const { id, summary, title, subtitle, description, media } = tour;
      return (
        <div className="cell card" key={index} style={{ width: 300 }}>
          <div className="card-divider">
            <h4><Link to={`/activity/${id}`}>{title}</Link></h4>
          </div>
          <img src={`${media.url.match(/.(png|gif|jpeg|jpg)$/)? media.url: 'http://via.placeholder.com/350x150'}`}/>
          <div className="card-section">
            <span>{subtitle}</span>
            <div dangerouslySetInnerHTML={{__html: description }}></div>
          </div>
        </div>
      )
    })
    
    console.log("hasMore", hasMore);
    return (
    <div className="grid-container">    
    <InfiniteScroll
            dataLength={tours.length}
            next={this.loadCityData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
      <div className="grid-x grid-padding-x grid-padding-x grid-margin-x small-up-2 medium-up-4 large-up-6">
        
        {toursElements}
        
      </div>
      </InfiniteScroll>
    </div>
    );
  }
  
}

export default City;