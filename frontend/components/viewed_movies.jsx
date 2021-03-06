import React from 'react';
import { Link } from 'react-router-dom';

import MovieList from './movie_list';

class ViewedMovies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            didFetchMovies: this.props.didFetchMovies
        }
    }

    componentDidMount() {
        if (!this.state.didFetchMovies) {
            this.props.fetchMovies();
            this.setState({
                didFetchMovies: true
            })
        }
    }

    render() {
        return (
            <div className="wrapper">
                <h2>Watched Movies</h2>

                <MovieList movies={this.props.movies} />
            </div>
        );
    }
}

export default ViewedMovies