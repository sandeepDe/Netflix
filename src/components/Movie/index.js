import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import MovieDetails from '../MovieDetails'

import './index.css'

const apiKey = 'd521585822a0db307382160dbcd2abf7'

class Movies extends Component {
  state = {movieDetails: {}, isLoading: true, similarMovies: []}

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.fetchMovieDetails(id)
  }

  fetchMovieDetails = async id => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`

    const accessToken = Cookies.get('access_token')

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const moviesResponse = await fetch(apiUrl, options)
    const moviesData = await moviesResponse.json()

    const updatedMovieDetails = {
      id: moviesData.id,
      posterPath: moviesData.poster_path,
      backdropPath: moviesData.backdrop_path,
      homepage: moviesData.homepage,
      title: moviesData.title,
      runtime: moviesData.runtime,
      adult: moviesData.adult,
      releaseDate: moviesData.release_date,
      overview: moviesData.overview,
      genres: moviesData.genres,
      spokenLanguages: moviesData.spoken_languages,
      voteCount: moviesData.vote_count,
      voteAverage: moviesData.vote_average,
      budget: moviesData.budget,
    }

    const pageNumber = Math.ceil(Math.random() * 500)

    const similarMoviesApi = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=${pageNumber}`

    const similarMoviesResponse = await fetch(similarMoviesApi, options)
    const similarMoviesData = await similarMoviesResponse.json()

    const filteredSimilarMoviesData = similarMoviesData.results.filter(
      eachMovie => eachMovie.poster_path !== null,
    )

    const similarMoviesList = filteredSimilarMoviesData.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: eachMovie.poster_path,
      title: eachMovie.title,
    }))

    this.setState({
      isLoading: false,
      movieDetails: updatedMovieDetails,
      similarMovies: similarMoviesList,
    })
  }

  updateMovies = id => {
    const {history} = this.props

    this.setState({movieDetails: '', isLoading: true, similarMovies: ''})

    this.fetchMovieDetails(id)

    history.push(`/movies/${id}`)
  }

  renderMoviesComponent = () => {
    const {movieDetails, similarMovies} = this.state

    const {posterPath, backdropPath} = movieDetails

    const imageUrl = `https://image.tmdb.org/t/p/original/${posterPath}`
    const mediumScreenImageUrl = `https://image.tmdb.org/t/p/original/${backdropPath}`

    return (
      <>
        <div
          className="low-screen-container"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            height: '75vh',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header bgColor={`${true}`} />
          <MovieDetails
            updateMovies={this.updateMovies}
            similarMovies={similarMovies}
            movieDetails={movieDetails}
          />
        </div>
        <div
          className="medium-screen-movie-container"
          style={{
            backgroundImage: `url(${mediumScreenImageUrl})`,
            backgroundSize: 'cover',
            height: '80vh',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header bgColor={`${true}`} />
          <MovieDetails
            updateMovies={this.updateMovies}
            similarMovies={similarMovies}
            movieDetails={movieDetails}
          />
        </div>
      </>
    )
  }

  renderLoading = () => (
    <div className="loading-container">
      <Header />
      <div className="loader-container">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <>{isLoading ? this.renderLoading() : this.renderMoviesComponent()}</>
    )
  }
}

export default Movies
