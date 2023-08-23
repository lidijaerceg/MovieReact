import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import MarkdownField from "../forms/MarkdownField";
import MultipleSelector, {
  multipleSelectorModel,
} from "../forms/MultipleSelector";
import TextField from "../forms/TextField";
import ImageField from "../forms/imageField";
import { genreDTO } from "../genres/genres.model";
import Button from "../utils/Button";
import { movieCreationDTO } from "./movies.model";

export default function MovieForm(props: movieFormProps) {
  const [selectedGenres, setSelectedGenres] = useState(
    mapToModel(props.selectedGenres)
  );
  const [nonSelectedGenres, setNonSelectedGenres] = useState(
    mapToModel(props.nonSelectedGenres)
  );

  function mapToModel(
    items: { id: number; name: string }[]
  ): multipleSelectorModel[] {
    return items.map((item) => {
      return { key: item.id, value: item.name };
    });
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values, actions) => {
        values.genresIds = selectedGenres.map((item) => item.key);
        props.onSubmit(values, actions);
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("This field is required").firstLetterUppercase(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField displayName="Title" field="title" />
          <TextField displayName="Trailer" field="trailer" />
          <ImageField
            displayName="Poster"
            field="poster"
            imageURL={props.model.posterURL}
          />
          <TextField displayName="Price" field="price"/>
          <TextField displayName="Amount" field="amount"/>


          <MarkdownField displayName="Summary" field="summary" />

          <MultipleSelector
            displayName="Genres"
            nonSelected={nonSelectedGenres}
            selected={selectedGenres}
            onChange={(selected, nonSelected) => {
              setSelectedGenres(selected);
              setNonSelectedGenres(nonSelected);
            }}
          />

          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/genres">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface movieFormProps {
  model: movieCreationDTO;
  onSubmit(
    values: movieCreationDTO,
    actions: FormikHelpers<movieCreationDTO>
  ): void;
  selectedGenres: genreDTO[];
  nonSelectedGenres: genreDTO[];
}
