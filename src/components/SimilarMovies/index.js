import './index.css'

const SimilarMovies = props => {
  const {movieDetails, OnClickIcon} = props
  const {id, title, posterPath} = movieDetails

  const path = `https://image.tmdb.org/t/p/original/${posterPath}`

  const onClickImage = () => {
    OnClickIcon(id)
  }

  return (
    <img
      onClick={onClickImage}
      key={id}
      className="image-style"
      alt={title}
      src={path}
    />
  )
}

export default SimilarMovies
