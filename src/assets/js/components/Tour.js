import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
class Tour extends Component {
  constructor(props){
    super(props);
    const { id } = props.match.params;
    this.state = {
      id,
      tour: {}
    };    
  }
  componentDidMount() {
    const { id } = this.state;
    fetch(`http://tour.api.thetripguru.com/tours/${id}`, { mode: 'cors'})
      .then(res => res.json())
      .then(data => {
        const { summary, title, subtitle, description, media } = data.data.attributes;
        const mediaUrl = Object.keys(media).find((mediaItem) => media[mediaItem].url && media[mediaItem].url !== "" );
        const tour = {
          title,
          subtitle,
          media: media[mediaUrl],
          summary,
          description,
        };
        
        this.setState({
          tour
        })
      })
  }
  render() {
    const { summary, title, subtitle, description, media } = this.state.tour;
    const imgSrc = media && media && media.url.match(/.(png|gif|jpeg|jpg)$/)? media.url: 'http://via.placeholder.com/350x150';
    return this.state.tour
        && <div className="grid-container">
          <div className="grid-y">
            <div className="cell small-6 medium-4 large-2">
              {title}
            </div>
            <div className="cell small-6 medium-8 large-10">
              <img src={`${imgSrc}`}/>
              <p>{subtitle}</p>
              <div dangerouslySetInnerHTML={{__html: summary }}></div>
              <div dangerouslySetInnerHTML={{__html: description }}></div>
            </div>
          </div>
        </div>;
  }
}

export default Tour;