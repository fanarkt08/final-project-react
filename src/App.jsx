import { useEffect, useState } from "react";
import { Container, Spinner, Alert, Row, Col } from "react-bootstrap";
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
      try {
        const response = await fetch("https://jsonfakery.com/movies/random/1");

        if (!response.ok) {
          throw new Error(`Erreur réseau : ${response.status}`);
        }

        const data = await response.json();
        setMovie(data[0]);
      } catch (err) {
        setError("Une erreur est survenue.");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Chargement du film en cours...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <strong>Erreur :</strong> {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <MovieCard movie={movie} />
          <h3 className="mb-3">Commentaires</h3>
          <CommentForm />
          <Comments />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
