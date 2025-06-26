import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import Comments from "./components/Comments";
import CommentForm from "./components/CommentForm";
import "./assets/App.scss";

const getmovie = async () => {
  const response = await fetch("https://jsonfakery.com/movies/random/1");
  const data = await response.json();
  return data;
};

function App() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getmovie();
      setMovie(data[0]);
    };
    fetchMovie();
  }, []);

  return (
    <Container className="mt-5 d-flex flex-column justify-content-center" style={{ maxWidth: 700 }}>
      {movie && (
        <>
          <Card className="mb-4 w-100">
            <Card.Img
              src={movie.poster_path}
            />
            <Card.Body>
              <Card.Title>{movie.original_title}</Card.Title>
              <Card.Text className="text-muted small">
                Sortie le {movie.release_date.split(",")[1].trim()}
              </Card.Text>
              <Card.Text className>{movie.overview}</Card.Text>
              <Card.Text className>
                Note moyenne : {movie.vote_average} ({movie.vote_count} votes)
              </Card.Text>
            </Card.Body>
          </Card>

          <h3 className="mb-3">Commentaires</h3>
          <CommentForm />
          <Comments />
        </>
      )}
    </Container>

  );
}

export default App;
