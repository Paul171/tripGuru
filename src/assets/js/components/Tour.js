import React, { Component } from 'react';

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
    fetch(`http://tour.api.thetripguru.com/tours/${id}`)
      .then(res => res.json())
      .then(data => {
        const { summary, title, subtitle, description, media } = data.data.attributes;
        const tour = {
          title,
          subtitle,
          media,
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
    const imgSrc = media && media.header && media.header.src.includes('http')? media.header.src: 'http://via.placeholder.com/350x150';
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