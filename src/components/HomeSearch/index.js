import {Link} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

import Header from '../Header'

const apiKey = 'd521585822a0db307382160dbcd2abf7'

class HomeSearch extends Component {
  constructor(props) {
    super(props)

    const userInput = localStorage.getItem('user_input')

    const pageNumber = localStorage.getItem('searched_movies_page_number')

    if (pageNumber === null) {
      localStorage.setItem('searched_movies_page_number', 1)
    } else {
      localStorage.setItem('searched_movies_page_number', `${pageNumber}`)
    }

    this.state = {
      userInput,
      pageNumber,
      totalPages: 1,
      isLoading: true,
      showNotFound: false,
      moviesList: [],
    }
  }

  componentDidMount() {
    const {userInput, pageNumber} = this.state

    this.fetchMovieDetails(userInput, pageNumber)
  }

  fetchMovieDetails = async (userInput, pageNumber) => {
    const searchedMoviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${userInput}&page=${pageNumber}`

    const accessToken = Cookies.get('access_token')

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const searchedMoviesResponse = await fetch(searchedMoviesUrl, options)
    const searchedMoviesJsonResponse = await searchedMoviesResponse.json()

    const updatedSearchedMoviesResponse = searchedMoviesJsonResponse.results.map(
      eachMovie => ({
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }),
    )

    const filteredSearchedMoviesResponse = updatedSearchedMoviesResponse.filter(
      eachMovie => eachMovie.posterPath !== null,
    )

    let totalPages = 1

    if (searchedMoviesJsonResponse.total_pages > 20) {
      totalPages = 20
    } else {
      totalPages = searchedMoviesJsonResponse.total_pages
    }

    if (filteredSearchedMoviesResponse.length === 0) {
      this.setState({isLoading: false, showNotFound: true})
    } else {
      this.setState({
        pageNumber: searchedMoviesJsonResponse.page,
        totalPages,
        isLoading: false,
        showNotFound: false,
        moviesList: filteredSearchedMoviesResponse,
      })

      localStorage.setItem(
        'searched_movies_page_number',
        `${searchedMoviesJsonResponse.page}`,
      )
    }
  }

  getInputValue = value => {
    const {userInput} = this.state

    if (userInput !== value) {
      this.setState({
        userInput: value,
        pageNumber: 1,
        isLoading: true,
        moviesList: [],
      })

      localStorage.setItem('searched_movies_page_number', `${1}`)

      this.fetchMovieDetails(value, 1)
    }
  }

  onClickRightIcon = () => {
    const {userInput, pageNumber, totalPages} = this.state

    let integerNumber = pageNumber

    if (integerNumber < totalPages) {
      integerNumber += 1

      this.setState({
        isLoading: true,
        moviesList: [],
        pageNumber: integerNumber,
      })

      localStorage.setItem('searched_movies_page_number', `${integerNumber}`)

      this.fetchMovieDetails(userInput, integerNumber)
    }
  }

  onClickLeftIcon = () => {
    const {userInput, pageNumber} = this.state

    let integerNumber = pageNumber

    if (integerNumber > 1) {
      integerNumber -= 1

      this.setState({
        isLoading: true,
        moviesList: [],
        pageNumber: integerNumber,
      })

      localStorage.setItem('searched_movies_page_number', `${integerNumber}`)

      this.fetchMovieDetails(userInput, integerNumber)
    }
  }

  renderPageNumber = () => {
    const {pageNumber, totalPages} = this.state

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
        <p className="page-numbers-paragraph">
          {pageNumber} of {totalPages}
        </p>
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

  renderNotFoundPage = () => {
    const {userInput} = this.state

    return (
      <div className="not-found-search-container">
        <img
          alt="not-found"
          className="not-found-search-image"
          src="https://res.cloudinary.com/breakingbad/image/upload/v1626711668/Group_7394_g1dsgg.png"
        />
        <p className="not-found-search-paragraph">
          Your search for {userInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderHomeSearchComponent = () => {
    const {showNotFound, moviesList} = this.state

    return (
      <>
        {showNotFound && this.renderNotFoundPage()}
        {!showNotFound && (
          <>
            <div className="search-movies-container">
              {moviesList.map(eachMovie => this.renderMovieIcon(eachMovie))}
            </div>
            {this.renderPageNumber()}
          </>
        )}
      </>
    )
  }

  renderLoadingComponent = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-search-container">
        <Header
          searchIconContainer={`${true}`}
          searchIcon={false}
          getInputAccess={this.getInputValue}
        />
        {isLoading
          ? this.renderLoadingComponent()
          : this.renderHomeSearchComponent()}
      </div>
    )
  }
}

export default HomeSearch
