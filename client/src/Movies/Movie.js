import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import EditForm from '../components/EditForm'
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      isEditing: false
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = () => {
    this.setState({
      ...this.state,
      isEditing: !this.state.isEditing
    })
    console.log(this.state.isEditing)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div>

      
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="save-button" style={{marginTop: '8%'}} onClick={this.editMovie}>
          Edit
        </div>
      </div>
      {this.state.isEditing && <EditForm theMovie={this.state.movie}/>}
      </div>
    );
  }
}
