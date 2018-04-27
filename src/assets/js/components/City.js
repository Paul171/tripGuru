import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class City extends Component {
  constructor(props) {
    super(props);
    const { name } = props.match.params;
    this.state = {
      name,
      tours: []
    }
  }

  componentDidMount() {
    console.log("sdfdsf");
    const { name } = this.state;
    fetch(`http://tour.api.thetripguru.com/tours?filter[location.url]=${name.toLowerCase()}&limit=15&offset=1`)
      .then(res => res.json())
      .then(data => {
        const tours = data.data.map((tour) => {
          const { summary, title, subtitle, description, media } = tour.attributes;
          return {
            id: tour.id,
            title,
            subtitle,
            media,
            summary,
            link: tour.links.self,          
          }
      });
      this.setState({
        tours
      })
    }
    );
  }

  render(){
    const { tours } = this.state;
    const toursElements = tours.map((tour, index) => {
      const { id, summary, title, subtitle, description, media } = tour;
      return (
        <div className="cell card" key={index} style={{ width: 300 }}>
          <div className="card-divider">
            <h4><Link to={`/activity/${id}`}>{title}</Link></h4>
          </div>
          <img src={`${media.header.src.includes('http')? media.header.src: 'http://via.placeholder.com/350x150'}`}/>
          <div className="card-section">
            <span>{subtitle}</span>
            <div dangerouslySetInnerHTML={{__html: description }}></div>
          </div>
        </div>
      )
    })
    

    return (
    <div className="grid-container">
      <div className="grid-x grid-padding-x grid-margin-x small-up-2 medium-up-4 large-up-6">
        {toursElements}
      </div>
    </div>
    );
  }
  
}

export default City;