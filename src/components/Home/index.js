import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import ReactSlick from '../ReactSlickCarousel'
import Footer from '../Footer'

import './index.css'

const apiKey = 'd521585822a0db307382160dbcd2abf7'
const trendingMoviesApi = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
const topRatedMoviesApi = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`
const originalsApi = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`

class Home extends Component {
  state = {
    isLoading: true,
    randomOriginal: {},
  }

  componentDidMount() {
    const pageNumber = Math.ceil(Math.random() * 500)

    this.fetchData(pageNumber)
  }

  fetchData = async pageNumber => {
    const originalsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${pageNumber}`

    const accessToken = Cookies.get('access_token')

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(originalsUrl, options)
    const data = await response.json()

    const filteredData = data.results.filter(
      eachMovie => eachMovie.poster_path !== null && eachMovie.overview !== '',
    )

    const randomMovie =
      filteredData[Math.floor(Math.random() * filteredData.length)]

    const updatedOriginalsDetails = {
      name: randomMovie.name,
      overview: randomMovie.overview,
      posterPath: randomMovie.poster_path,
      backdropPath: randomMovie.backdrop_path,
      id: randomMovie.id,
    }

    this.setState({
      isLoading: false,
      randomOriginal: updatedOriginalsDetails,
    })
  }

  homeMovieDetails = () => {
    const {randomOriginal} = this.state

    const {name, overview} = randomOriginal

    return (
      <div className="home-movie-details-container">
        <h1 className="home-movie-heading">{name}</h1>
        <p className="home-movie-description">{overview}</p>
        <button type="button" className="home-movie-play-button">
          Play
        </button>
      </div>
    )
  }

  homeComponent = () => {
    const {randomOriginal} = this.state

    const {posterPath, backdropPath} = randomOriginal

    const backgroundImage = `https://image.tmdb.org/t/p/original/${posterPath}`
    const mediumScreenBackgroundImage = `https://image.tmdb.org/t/p/original/${backdropPath}`

    return (
      <>
        <div
          className="home-container"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            height: '75vh',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header bgColor={`${true}`} home={`${true}`} />
          {this.homeMovieDetails()}
          <div className="home-bottom-container">
            <div>
              <h1 className="trending-now-heading">Trending Now</h1>
              <ReactSlick apiUrl={trendingMoviesApi} />
            </div>
            <div>
              <h1 className="trending-now-heading">Popular</h1>
              <ReactSlick apiUrl={topRatedMoviesApi} />
            </div>
            <div className="originals-container">
              <h1 className="trending-now-heading">Originals</h1>
              <ReactSlick apiUrl={originalsApi} />
            </div>
            <Footer />
          </div>
        </div>

        <div
          className="medium-screen-home-container"
          style={{
            backgroundImage: `url(${mediumScreenBackgroundImage})`,
            backgroundSize: 'cover',
            height: '80vh',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header bgColor={`${true}`} home={`${true}`} />
          {this.homeMovieDetails()}
          <div className="home-bottom-container">
            <div>
              <h1 className="trending-now-heading">Trending Now</h1>
              <ReactSlick apiUrl={trendingMoviesApi} />
            </div>
            <div>
              <h1 className="trending-now-heading">Popular</h1>
              <ReactSlick apiUrl={topRatedMoviesApi} />
            </div>
            <div>
              <h1 className="trending-now-heading">Originals</h1>
              <ReactSlick apiUrl={originalsApi} />
            </div>

            <Footer />
          </div>
        </div>
      </>
    )
  }

  homeLoadingComponent = () => (
    <div className="home-loading-container">
      <Header home={`${true}`} />
      <div className="loader-container">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading ? this.homeLoadingComponent() : this.homeComponent()}
      </div>
    )
  }
}

export default Home
