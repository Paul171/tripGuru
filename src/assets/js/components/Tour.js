import React, { Component } from 'react';

class Tour extends Component {
  constructor(props){
    super(props);
    console.log("props", props);
    const { id } = props.match.params;
    this.state = {
      id,
      tour: {}
    };    
  }
  componentDidMount() {
    const { id } = this.state;
    console.log("id", id);
    fetch(`http://tour.api.thetripguru.com/tours/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("data", data);
        const { summary, title, subtitle, description, media } = data.data.attributes;
        const tour = {
          title,
          subtitle,
          media,
          summary,
          description,
        };
        console.log("tour", tour);
        this.setState({
          tour
        })
      })
  }
  render() {
    console.log("this.state", this.state);
    const { summary, title, subtitle, description, media } = this.state.tour;
    return this.state.tour
        && <div className="grid-container">
          <div className="grid-y">
            <div className="cell small-6 medium-4 large-2">
              {title}
            </div>
            <div className="cell small-6 medium-8 large-10">
              <img src={`${media && media.header? media.header.src:''}`}/>
              <p>{subtitle}</p>
              <p>{`Summary: ${summary? summary: ''}`}</p>
              <p>{description}</p>
            </div>
          </div>
        </div>;
  }
}

export default Tour;