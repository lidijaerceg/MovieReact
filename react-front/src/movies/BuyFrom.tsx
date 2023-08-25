import { Field, Form, Formik, FormikHelpers } from "formik";
import { buyDTO, movieCreationDTO, movieDTO } from "./movies.model";
import Button from "../utils/Button";
import TextField from "../forms/TextField";
import { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import { Link, useParams } from "react-router-dom";
import AmountBorders from "../utils/AmountBorders";
import MarkdownField from "../forms/MarkdownField";

export default function BuyForm(props: buyFormProps) {
  const { id }: any = useParams();
  const [movie, setMovie] = useState<movieDTO>();
  const [selectedAmount, setSelectedAmount] = useState<number>(1); // State to hold the selected amount
  const remainingAmount = movie ? movie.amount - selectedAmount : 0;

  useEffect(() => {
    axios
      .get(`${urlMovies}/${id}`)
      .then((response: AxiosResponse<movieDTO>) => {
        setMovie(response.data);
      });
  }, [id]);

  function handleAmountChange(newValue: number): void {
    setSelectedAmount(newValue);
  }

  const rightHalfStyle = {
    display: "flex",
    flexDirection: "column" as "column", // Type assertion
    alignItems: "flex-end" as "flex-end", // Type assertion
    paddingRight: "20px" as "20px", // Type assertion
  };
  const totalPrice = movie ? selectedAmount * movie.price + 5 : 0;

  return movie ? (
    <>
      <Formik initialValues={props.model} onSubmit={props.onSubmit}>
        {(formikProps) => (
          <Form>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>
                The amount left: {remainingAmount}. Pick ammount:
              </div>
              <AmountBorders
               
                initialValue={1} // Initial value for the input field
                minValue={1} // Minimum value
                maxValue={movie.amount} // Maximum value based on movie.amount
                onAmountChange={handleAmountChange} // Callback for handling amount changes
                name={""}              />
            </div>
            <p>The cost of shipping is 5$.</p>

            <MarkdownField displayName="Comment" field="comment" />
            <TextField displayName="Address" field="address" />

            <br />
            <br />

            <div style={rightHalfStyle}>
        <h4>Total price: {totalPrice}$</h4>
        <Link to={"/"} className="btn btn-primary">
          Purchase
        </Link>
      </div> 


            <Button disabled={formikProps.isSubmitting} type="submit">
              Purchase
            </Button>
            <Link className="btn btn-secondary" to="/">
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
    </>
  ) : (
    <Loading />
  );
}

interface buyFormProps {
  model: buyDTO;
  onSubmit(vales: buyDTO, action: FormikHelpers<buyDTO>): void;
}
