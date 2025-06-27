import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../redux/commentSlice";
import { Button, ListGroup, Alert } from "react-bootstrap";

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
    <ListGroup className="my-4 d-flex flex-column gap-3">
      {comments.map((comment) => (
        <ListGroup.Item key={comment.id} className="d-flex flex-column">
          <div className="fw-bold small mb-1">Note : {comment.note}/5</div>
          <div className="mb-2">{comment.comment}</div>
          <Button
            variant="danger"
            size="sm"
            className="align-self-end"
            onClick={() => dispatch(deleteComment(comment.id))}
          >
            Supprimer
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Comments;
