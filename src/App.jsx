import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import Comments from "./components/Comments";
import CommentForm from "./components/CommentForm";
import MovieCard from "./components/MovieCard";
import "./assets/App.scss";

function App() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://jsonfakery.com/movies/random/1");

        if (!response.ok) {
          throw new Error(`Erreur réseau : ${response.status}`);
        }

        const data = await response.json();
        setMovie(data[0]);
      } catch (err) {
        setError(err.message || "Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);

  return (
    <Container className="mt-4 d-flex flex-column justify-content-center w-50">
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-3">Chargement du film en cours...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          <strong>Erreur :</strong> {error}
        </Alert>
      )}

      {!loading && !error && movie && (
        <>
          <MovieCard movie={movie} />

          <h3 className="mb-3">Commentaires</h3>
          <CommentForm />
          <Comments />
        </>
      )}
    </Container>
  );
}

export default App;
