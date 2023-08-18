import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { urlGenres, urlMovies } from "../endpoints";
import { genreDTO } from "../genres/genres.model";
import Button from "../utils/Button";
import MoviesList from "./MoviesList";
import { movieDTO } from "./movies.model";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "../utils/Pagination";

export default function FilterMovies() {
  const initialValues: filterMoviesForm = {
    title: "",
    genreId: 0,
    page: 1,
    recordsPerPage: 10
  };

  const [genres, setGenres] = useState<genreDTO[]>([]);
  const [movies, setMovies] = useState<movieDTO[]>([]);
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    axios
      .get(`${urlGenres}/all`)
      .then((response: AxiosResponse<genreDTO[]>) => {
        setGenres(response.data);
      });
  }, []);

  useEffect(()=>{

    if (query.get('title')){
        initialValues.title = query.get('title')!;
    }

    if (query.get('genreId')){
        initialValues.genreId = parseInt(query.get('genreId')!, 10);
    }

    if (query.get('page')){
        initialValues.page = parseInt(query.get('page')!, 10);
    }

    searchMovies(initialValues);
  }, [])

  function searchMovies(values: filterMoviesForm) {
    modifyURL(values);
    axios
      .get(`${urlMovies}/filter`, {params: values})
      .then((response: AxiosResponse<movieDTO[]>) => {
        const records = parseInt(response.headers['totalamountofrecords'], 10);
        setTotalAmountOfPages(Math.ceil(records/values.recordsPerPage));
        setMovies(response.data);
      });
  }

  function modifyURL(values: filterMoviesForm){
    const queryStrings: string[] = [];

    if(values.title){
        queryStrings.push(`title=${values.title}`);
    }

    if(values.genreId !== 0){
        queryStrings.push(`genreId=${values.genreId}`);
    }

    queryStrings.push(`page=${values.page}`);

    history.push(`/movies/filter?${queryStrings.join('&')}`);

  }

  return (
    <>
      <h3>Filter Movies</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
            values.page = 1;
            searchMovies(values);
        }}
      >
        {(formikProps) => (
          <>
            <Form>
              <div className="row gx-3 allign-items-center mb-3">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title of the movie"
                    {...formikProps.getFieldProps("title")}
                  />
                </div>
                <div className="col-auto">
                  <select
                    className="form-select"
                    {...formikProps.getFieldProps("genreId")}
                  >
                    <option value="0">Choose a genre</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto">
                  <Button
                    className="btn btn-primary"
                    onClick={() => formikProps.submitForm()}
                  >
                    Filter
                  </Button>
                  <Button
                    className="btn btn-danger ms-3"
                    onClick={() => {
                        formikProps.setValues(initialValues);
                        searchMovies(initialValues);
                    }}>
                    Clear
                  </Button>
                </div>
              </div>
            </Form>

            <MoviesList movies={movies} />
            <Pagination 
                totalAmountOfPages={totalAmountOfPages}
                currentPage={formikProps.values.page}
                onChange={newPage=>{
                    formikProps.values.page = newPage;
                    searchMovies(formikProps.values)
                }}
            />
          </>
        )}
      </Formik>
    </>
  );
}

interface filterMoviesForm {
  title: string;
  genreId: number;
  page: number;
  recordsPerPage: number;
}
