import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/commentSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button } from "react-bootstrap";

const schema = yup.object().shape({
  comment: yup
    .string()
    .required("Le commentaire est obligatoire")
    .max(500, "Maximum 500 caractères"),

  note: yup
    .string()
    .required("Veuillez sélectionner une note.")
    .transform((value) => (value === "" ? undefined : Number(value)))
    .typeError("La note doit être un nombre.")
    .min(1, "La note doit être au minimum 1.")
    .max(5, "La note doit être au maximum 5."),

  acceptConditions: yup
    .boolean()
    .oneOf([true], "Vous devez accepter les conditions générales"),
});

function CommentForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: "",
      note: "",
      acceptConditions: false,
    },
  });

  const onSubmit = ({ comment, note }) => {
    dispatch(addComment({ comment, note: Number(note) }));
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3 align-items-start">
      <Form.Group controlId="comment" className="w-100">
        <Form.Label>Ajouter un commentaire</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...register("comment")}
          isInvalid={!!errors.comment}
        />
        <Form.Control.Feedback type="invalid">
          {errors.comment?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="note" className="w-100">
        <Form.Label>Note</Form.Label>
        <Form.Select
          {...register("note")}
          isInvalid={!!errors.note}
        >
          <option value="">Sélectionnez une note</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.note?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="acceptConditions" className="w-100">
        <Form.Check
          type="checkbox"
          label="J'accepte les conditions générales"
          {...register("acceptConditions")}
          isInvalid={!!errors.acceptConditions}
          feedback={errors.acceptConditions?.message}
          feedbackType="invalid"
        />
      </Form.Group>

      <Button type="submit" className="primary">
        Ajouter
      </Button>
    </Form>
  );
}

export default CommentForm;
