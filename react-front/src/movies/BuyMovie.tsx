import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { buyDTO, movieDTO } from "./movies.model";
import axios, { AxiosResponse } from "axios";
import { urlMovies, urlPurchase } from "../endpoints";
import Loading from "../utils/Loading";
import TextField from "../forms/TextField";
import AmountBorders from "../utils/AmountBorders";
import { Formik } from "formik";
import BuyForm from "./BuyFrom";
import { convertBuyFormData } from "../utils/formDataUtils";

export default function BuyMovie() {
  const { id }: any = useParams();
  const [movie, setMovie] = useState<movieDTO>();
  const [selectedAmount, setSelectedAmount] = useState<number>(1); // State to hold the selected amount
  const [errors, setErrors] = useState<string[]>([]);

  const history = useHistory();

  
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
  const remainingAmount = movie ? movie.amount - selectedAmount : 0;
  const totalPrice = movie ? (selectedAmount > 0 ? selectedAmount * movie.price + 5 :0) : 0;
 



  async function buy(movie: buyDTO){
    try{
        const formData = convertBuyFormData(movie);
        const response = await axios({
            method: 'post',
            url: urlPurchase,
            data: formData,
        })
        
        history.push(`/movie/${response.data}`);

    }
    catch(error){
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error('Server Error Response:', error.response.data);
            } else {
                console.error('Request Error:', error.message);
            }
            setErrors(error.response?.data.message || ['An error occurred.']);
        } else {
            console.error('Unknown Error:', error);
            setErrors(['An unknown error occurred.']);
        }
    }
}


  return movie ? (
    <>
      <h2>Purchase</h2>
      <h4>
        {movie.title} {movie.price}$
      </h4>
      {/* <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "10px" }}>
          The amount left: {remainingAmount}. Pick ammount:
        </div>
        <AmountBorders
          initialValue={0} // Initial value for the input field
          minValue={1} // Minimum value
          maxValue={movie.amount} // Maximum value based on movie.amount
          onAmountChange={handleAmountChange} // Callback for handling amount changes
          name=""        />
      </div>
      <p>The cost of shipping is 5$.</p>
      <br />
      <br />

      
            
      <br />
      <br />
      <div style={rightHalfStyle}>
        <h4>Total price: {totalPrice}$</h4>
        <Link to={"/"} className="btn btn-primary">
          Purchase
        </Link>
      </div> */}

      <BuyForm model={{ comment: '', address: ''}} 
        onSubmit={async values => await buy(values)}
      />
    </>
  ) : (
    <Loading />
  );
}
