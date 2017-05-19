import React from 'react';
import axios from 'axios';

class ResultListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    };
  }

  favoriteHandler(entry) {
    console.log('in handler for favorites');
    axios({
      url: '/favorites',
      method: 'POST',
      data: {collegeId: entry.id}
    })
    .then((results) => {
      console.log('added to favorites - message received by client from server');
      this.setState({
        showMessage: true
      });
    })
    .catch((error) =>{
      console.log('error adding favorites');
    });
  }

  render () {
    const college = this.props.college;
    return (
      <div className = "card">
        <div className="row">
          <div className="col-md-3">
            <img className="img-responsive cardImages style_prevu_kit" src = {college.image_url}/>
          </div>
          <a className="college-name" href={'http://' + college.website_url}> {college.name}</a>
          <div className="heart" onClick={this.favoriteHandler.bind(this, college)}></div>
          <p>{this.state.showMessage ? 'College added to your favorites!': ''}</p>
          <p className="description">{college.description}</p>
        </div>
      </div>
    );
  }
}

export default ResultListEntry;