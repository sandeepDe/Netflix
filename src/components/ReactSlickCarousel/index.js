import {Link} from 'react-router-dom'

import {Component} from 'react'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

class ReactSlick extends Component {
  state = {trendingMovies: []}

  componentDidMount() {
    const {apiUrl} = this.props

    this.fetchTrendingMovies(apiUrl)
  }

  fetchTrendingMovies = apiUrl => {
    fetch(`${apiUrl}`)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({trendingMovies: response.results})
      })
  }

  renderSlides = () => {
    const {trendingMovies} = this.state

    const moviesList = trendingMovies.filter(
      eachMovie => eachMovie.poster_path !== null,
    )

    return moviesList.map(eachMovie => {
      const trendingMovieImage = `https://image.tmdb.org/t/p/original/${eachMovie.poster_path}`

      return (
        <Link
          key={eachMovie.id}
          to={`/movies/${eachMovie.id}`}
          className="link-item"
        >
          <div className="react-slick-item">
            <img
              className="poster"
              src={trendingMovieImage}
              width="100%"
              height="100%"
              alt="originals"
            />
          </div>
        </Link>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <Slider {...settings}>{this.renderSlides()}</Slider>
      </div>
    )
  }
}

export default ReactSlick
