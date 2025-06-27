import { Card } from "react-bootstrap";

function MovieCard({ movie }) {
  if (!movie) return null;

  const releaseDate = new Date(movie.release_date);

  return (
    <Card className="mb-4 w-100">
      <Card.Img variant="top" src={movie.poster_path} alt={movie.original_title} />
      <Card.Body>
        <Card.Title>{movie.original_title}</Card.Title>
        <Card.Subtitle>
            Sortie le{" "}
            {releaseDate.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })}
        </Card.Subtitle>
        <Card.Text>{movie.overview}</Card.Text>
        <Card.Text>
          Note moyenne : {movie.vote_average} ({movie.vote_count} votes)
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
