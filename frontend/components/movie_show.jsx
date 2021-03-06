import React from 'react';
import { Link } from 'react-router-dom';
import BoxOfficeChartContainer from './box_office_chart_container';
import LoadingSpinner from './loading_spinner';
import { _renderBoxOfficeDay, _renderDollarsWithCommas } from '../util/helpers'
import { _renderIconBookmarked, _renderIconSeenIt } from '../util/helpers'

function _renderIMDBUrl(id) {
    return `https://www.imdb.com/title/${id}`
}


class MovieShow extends React.Component {

    constructor(props) {
        super(props)

        this.handleClickFavorite = this.handleClickFavorite.bind(this);
        this.handleClickViewed = this.handleClickViewed.bind(this);
    }

    componentDidMount() {
        if (this.props.movie.box_office_days == undefined) {
            this.props.fetchMovie(this.props.movieId);
        }
    }

    handleClickFavorite(event) {
        event.stopPropagation();

        if (this.props.movie.is_favorited) {
            this.props.markMovieAsNotFavorite(this.props.movie.id);
        } else {
            this.props.markMovieAsFavorite(this.props.movie.id);
        }
    }

    handleClickViewed(event) {
        event.stopPropagation();

        if (this.props.movie.is_viewed) {
            this.props.markMovieAsNotViewed(this.props.movie.id);
        } else {
            this.props.markMovieAsViewed(this.props.movie.id);
        }
    }


    render() {
        const { movie } = this.props;

        const color = '#4DAF7C';
        let boxOfficeDayRows = (
            <tr>
                <td colSpan={7} style={{position: 'relative'}}>
                    <LoadingSpinner />
                </td>
            </tr>
        );

        let sortedBoxOfficeDays = [];

        if (movie.box_office_days) {
            sortedBoxOfficeDays = movie.box_office_days.sort(function(a, b) {
                return new Date(a.day) - new Date(b.day);
            })
            boxOfficeDayRows = sortedBoxOfficeDays.map((boxOfficeDay) => {
                return (
                    <tr className='row' key={boxOfficeDay.id}>
                        <td className='cell u-nowrap'>
                            {_renderBoxOfficeDay(boxOfficeDay.day, movie.release_date)}
                        </td>
                        <td className='cell u-text--right'>
                            {boxOfficeDay.metacritic_score}
                        </td>
                        <td className='cell u-text--right'>
                            {boxOfficeDay.imdb_rating}
                        </td>
                        <td className='cell u-text--right'>
                            {boxOfficeDay.tomato_meter}
                        </td>
                        <td className='cell u-text--right'>
                            {boxOfficeDay.bomojo_rank}
                        </td>
                        <td className='cell u-text--right'>
                            {_renderDollarsWithCommas(boxOfficeDay.bomojo_daily_gross)}
                        </td>
                        <td className='cell u-text--right'>
                            {boxOfficeDay.bomojo_theater_count}
                        </td>
                        <td className='cell u-text--right'>
                            {_renderDollarsWithCommas(boxOfficeDay.bomojo_to_date_gross)}
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div className='wrapper'>
                <Link to='/'>Back to Search / Index</Link>
                <div className='movie-header'>
                    <div className='u-flex u-flexAlignItemsCenter'>
                        <div className="FlexItem u-flexGrow1">
                        <h2>
                            {movie.title || "\u00a0"}
                        </h2>
                        </div>
                        <div
                            className="FlexItem u-flexGrow1 u-flexInitial"
                            onClick={this.handleClickViewed}
                            style={{width: 40}}
                        >
                            {_renderIconSeenIt(movie.is_viewed)}
                        </div>
                        <div
                            className="FlexItem u-flexGrow1 u-flexInitial"
                            onClick={this.handleClickFavorite}
                            style={{width: 40}}
                        >
                            {_renderIconBookmarked(movie.is_favorited)}
                        </div>
                    </div>
                </div>
                <a
                    href={_renderIMDBUrl(movie.imdb_id)}
                    target="_blank">
                    view on imdb <i className="fa fa-external-link" aria-hidden="true"></i>
                </a>
                <div className=''>
                    <div>
                        <span className='label'>Year:</span>
                        {' '}
                        <strong>{movie.year}</strong>
                    </div>
                    <div>
                        <span className='label'>Release date:</span>
                        {' '}
                        <strong>{movie.release_date}</strong>
                    </div>
                    <div>
                        <span className='label'>Rating:</span>
                        {' '}
                        <strong>{movie.mpaa_rating}</strong>
                    </div>

                    <BoxOfficeChartContainer
                        movie={movie}
                        boxOfficeDays={sortedBoxOfficeDays} />

                    <table className='table box-office-days'>
                        <thead>
                            <tr className='row header'>
                                <td className='cell'>
                                    Date
                                </td>
                                <td className='cell'>
                                    Metacritic
                                </td>
                                <td className='cell'>
                                    IMDB
                                </td>
                                <td className='cell'>
                                    Tomatometer
                                </td>
                                <td className='cell'>
                                    Box Office Rank
                                </td>
                                <td className='cell'>
                                    Single Day Box Office
                                </td>
                                <td className='cell'>
                                    Theater Count
                                </td>
                                <td className='cell'>
                                    Box Office Total
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {boxOfficeDayRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default MovieShow;