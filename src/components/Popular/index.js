import {Link} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'

const apiKey = 'd521585822a0db307382160dbcd2abf7'

class Popular extends Component {
  state = {moviesData: [], isLoading: true}

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.fetchPopularMovies(id)
  }

  fetchPopularMovies = async id => {
    const popularMoviesApi = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${id}`

    const accessToken = Cookies.get('access_token')

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const popularMoviesResponse = await fetch(popularMoviesApi, options)
    const popularMoviesData = await popularMoviesResponse.json()

    const popularMoviesUpdatedData = popularMoviesData.results.map(
      eachObject => ({
        id: eachObject.id,
        posterPath: eachObject.poster_path,
        title: eachObject.title,
      }),
    )

    this.setState({moviesData: popularMoviesUpdatedData, isLoading: false})
  }

  onClickLeftIcon = () => {
    const {match, history} = this.props
    const {params} = match
    const {id} = params

    let integer = JSON.parse(id)

    if (integer > 1) {
      integer -= 1

      this.setState({moviesData: [], isLoading: true})

      this.fetchPopularMovies(integer)

      history.push(`/popular/${integer}`)
    }
  }

  onClickRightIcon = () => {
    const {match, history} = this.props
    const {params} = match
    const {id} = params

    let integer = JSON.parse(id)

    if (integer < 20) {
      integer += 1

      this.setState({moviesData: [], isLoading: true})

      this.fetchPopularMovies(integer)

      history.push(`/popular/${integer}`)
    }
  }

  renderPageNumber = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className="page-numbers-container">
        <button
          onClick={this.onClickLeftIcon}
          type="button"
          className="left-button"
        >
          <img
            alt="left-arrow"
            src="https://res.cloudinary.com/breakingbad/image/upload/v1626348232/Icon_xddcty.png"
          />
        </button>
        <p className="page-numbers-paragraph">{id} of 20</p>
        <button
          onClick={this.onClickRightIcon}
          type="button"
          className="right-button"
        >
          <img
            alt="right-arrow"
            src="https://res.cloudinary.com/breakingbad/image/upload/v1626348311/Icon_jus1xh.png"
          />
        </button>
      </div>
    )
  }

  renderMovieIcon = props => {
    const {title, posterPath, id} = props

    const imageUrl = `https://image.tmdb.org/t/p/original/${posterPath}`

    return (
      <Link key={id} to={`/movies/${id}`} className="link-item">
        <div className="movie-icon-item">
          <img alt={title} className="movie-image" src={imageUrl} />
        </div>
      </Link>
    )
  }

  renderPopularComponent = () => {
    const {moviesData} = this.state

    return (
      <>
        <div className="popular-movies-container">
          {moviesData.map(eachMovie => this.renderMovieIcon(eachMovie))}
        </div>
        {this.renderPageNumber()}
        <Footer />
      </>
    )
  }

  renderLoadingComponent = () => (
    <div className="loader-container">
      <div className="loader-container">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <>
        <div className="popular-background-container">
          <Header popular={`${true}`} />
          {isLoading
            ? this.renderLoadingComponent()
            : this.renderPopularComponent()}
        </div>
      </>
    )
  }
}

export default Popular
