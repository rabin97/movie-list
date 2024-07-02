import './styles/App.css'
import MovieCard from './components/MovieCard'
import MovieForm from './components/MovieForm'
import ReviewForm from './components/ReviewForm'
import { useContext, useEffect, useState } from 'react'
import { useAppSelector } from './redux/hooks/redux.hooks'
import { Movie } from './redux/types/movie.type'
import { context } from './hooks/state.context'

function App() {

  const [formshow, setformshow] = useState<boolean>(false)
  const [reviewformshow, setReviewformshow] = useState<boolean>(false)
  const { state, dispatch } = useContext(context);
  console.log("🚀 ~ App ~ state", state.data)

  const handleFormOpen = (formtype: string, id?: string) => {
    // console.log("🚀 ~ handleFormOpen ~ id:", id)
    formtype === "form" ? setformshow(true) : setReviewformshow(true)
    const data = movies.find(movie => movie.id === id)
    console.log("🚀 ~ handleFormOpen ~ data:", data)

    dispatch({ type: "SET_DATA_CONTENT", payload: data as Movie })


  }

  useEffect(() => {
    if (reviewformshow || formshow) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }

  }, [formshow, reviewformshow])

  const movies = useAppSelector(state => state.movie.movies)





  return (
    <main className='container'>
      <div className='content'>
        <div className='hreading'>
          <h1>All Movies</h1>
          <button onClick={() => handleFormOpen("form")}>+Add</button>
        </div>

        <MovieForm show={formshow} setformshow={setformshow} />
        <ReviewForm show={reviewformshow} handleFormOpen={handleFormOpen} setReviewformshow={setReviewformshow} />
        <div className='movie-content'>
          {
            movies.map(movie => (
              <MovieCard data={movie} key={movie.id} handleFormOpen={handleFormOpen} setReviewformshow={handleFormOpen} />
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default App
