import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../redux/commentSlice";
import { Button, Card, Alert } from "react-bootstrap";

function Comments() {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  if (comments.length === 0) {
    return (
      <Alert variant="info" className="mt-4">
        Aucun commentaire pour le moment.
      </Alert>
    );
  }

  return (
    <div className="d-flex flex-column my-4">
      {comments.map((comment) => (
        <Card key={comment.id} >
          <Card.Body>
            <Card.Title className="fw-bold fs-6">Note : {comment.note}/5</Card.Title>
            <Card.Text>{comment.comment}</Card.Text>
            <Button
              variant="danger"
              className="float-end"
              onClick={() => dispatch(deleteComment(comment.id))}
            >
              Supprimer
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Comments;
