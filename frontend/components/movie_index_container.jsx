import { connect } from 'react-redux';

import { fetchMovies } from '../actions/movie_actions';
import { sortMoviesByReleaseDate } from '../reducers/selectors';
import { MovieIndex } from './movie_index';

const mapStateToProps = (state, {  }) => {
    const movies = sortMoviesByReleaseDate(Object.values(state.movies))
    return {
        movies,
        didFetchMovies: state.ui.didFetchMovies
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMovies: id => dispatch(fetchMovies())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieIndex);