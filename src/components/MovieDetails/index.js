import {withRouter} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

import SimilarMovies from '../SimilarMovies'

const listOfMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const nth = d => {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

const crores = d => {
  switch (d) {
    case 0:
      return 'Less than a Crore'
    case 1:
      return '1 Crore'
    default:
      return `${d} Crores`
  }
}

class MovieDetails extends Component {
  onClickMovieIcon = id => {
    const {updateMovies} = this.props

    updateMovies(id)
  }

  renderSimilarMovies = () => {
    const {similarMovies} = this.props

    const smallScreenSimilarMoviesCopy = [...similarMovies]
    const smallScreenSimilarMovies = smallScreenSimilarMoviesCopy.splice(0, 5)
    const mediumScreenSimilarMoviesCopy = [...similarMovies]
    const mediumScreenSimilarMovies = mediumScreenSimilarMoviesCopy.splice(0, 6)

    return (
      <div className="similar-movies-container">
        <h1 className="similar-movies-heading">More like this</h1>
        <div className="similar-movies-list-container">
          {smallScreenSimilarMovies.map(eachMovieDetails => (
            <SimilarMovies
              key={eachMovieDetails.id}
              movieDetails={eachMovieDetails}
              OnClickIcon={this.onClickMovieIcon}
            />
          ))}
        </div>
        <div className="medium-screen-similar-movies-list-container">
          {mediumScreenSimilarMovies.map(eachMovieDetails => (
            <SimilarMovies
              key={eachMovieDetails.id}
              movieDetails={eachMovieDetails}
              OnClickIcon={this.onClickMovieIcon}
            />
          ))}
        </div>
      </div>
    )
  }

  renderMovieDetails = () => {
    const {movieDetails} = this.props
    const {
      releaseDate,
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
    } = movieDetails

    const budgetInCrores = Math.floor(budget / 10000000)

    const outputBudget = crores(budgetInCrores)

    const newDate = new Date(releaseDate)

    const yearOfRelease = newDate.getFullYear()

    const getMonth = newDate.getMonth()

    const monthOfRelease = listOfMonths[getMonth]

    const date = newDate.getDate()

    const dateOfRelease = `${date}${nth(
      date,
    )} ${monthOfRelease} ${yearOfRelease}`

    return (
      <div className="detailed-movie-categories-container">
        <div className="generes-category">
          <h1 className="generes-heading">Generes</h1>
          <div className="generes-container">
            {genres.map(eachGenre => (
              <p key={eachGenre.id} className="category-paragraph">
                {eachGenre.name}
              </p>
            ))}
          </div>
        </div>
        <div className="audio-category">
          <h1 className="audio-heading">Audio Available</h1>
          <div className="audio-container">
            {spokenLanguages.map(eachAudio => (
              <p key={eachAudio.name} className="category-paragraph">
                {eachAudio.name}
              </p>
            ))}
          </div>
        </div>
        <div className="rating-category">
          <h1 className="rating-heading">Rating Count</h1>
          <p className="category-paragraph">{voteCount}</p>
          <h1 className="rating-average-heading">Rating Average</h1>
          <p className="category-paragraph">{voteAverage}</p>
        </div>
        <div className="budget-category">
          <h1 className="budget-heading">Budget</h1>
          <p className="category-paragraph">{outputBudget}</p>
          <h1 className="release-date-heading">Release Date</h1>
          <p className="category-paragraph">{dateOfRelease}</p>
        </div>
      </div>
    )
  }

  renderTitleDetails = () => {
    const {movieDetails} = this.props
    const {title, runtime, adult, releaseDate, overview} = movieDetails

    const noOfHours = runtime / 60
    const noOfExactHours = Math.floor(noOfHours)
    const noOfMinutes = Math.round((noOfHours - noOfExactHours) * 60)

    const watchTime = `${noOfExactHours}h ${noOfMinutes}m`

    const sensorRating = adult ? 'A' : 'UA'

    const releasedYear = releaseDate.split('-')[0]

    return (
      <div className="title-details-container">
        <h1 className="movie-title">{title}</h1>
        <div className="movie-review-container">
          <p className="watch-time">{watchTime}</p>
          <button type="button" className="sensor-rating">
            {sensorRating}
          </button>
          <p className="release-year">{releasedYear}</p>
        </div>
        <p className="movie-overview">{overview}</p>
        <button type="button" className="play-button">
          Play
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        {this.renderTitleDetails()}
        {this.renderMovieDetails()}
        {this.renderSimilarMovies()}
      </>
    )
  }
}

export default withRouter(MovieDetails)
