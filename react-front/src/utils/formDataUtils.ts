import { userCredentialsReg } from '../auth/auth.model';
import { buyDTO, movieCreationDTO } from '../movies/movies.model';

export function convertProfileToFormData(profile: userCredentialsReg){
    const formData = new FormData();

    formData.append('username', profile.username);

    if (profile.role){
        formData.append('role', profile.role);
    }


    if (profile.picture){
        formData.append('picture', profile.picture);
    }

    if (profile.name){
        formData.append('name', profile.name);
    }

    if (profile.lastname){
        formData.append('lastname', profile.lastname);
    }

    if (profile.address){
        formData.append('address', profile.address);
    }

    if (profile.dateOfBirth){
        formData.append('dateOfBirth', formatDate(profile.dateOfBirth));
    }

    return formData;
}

export function convertMovieToFormData(movie: movieCreationDTO){
    const formData = new FormData();

    formData.append('title', movie.title);


    if (movie.summary){
        formData.append('summary', movie.summary);
    }

    formData.append('trailer', movie.trailer);


    if (movie.poster){
        formData.append('poster', movie.poster);
    }

    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('amount', movie.amount.toString());
    formData.append('price', movie.price.toString());

    return formData;
}

export function convertBuyFormData(purchase: buyDTO){
    const formData = new FormData();


    if (purchase.buyAmount){
        formData.append('amount', purchase.buyAmount.toString());    
    }

    if (purchase.comment){
        formData.append('poster', purchase.comment);
    }

    if (purchase.finalCost){
        formData.append('amount', purchase.finalCost.toString());    
    }

    if (purchase.address){
        formData.append('poster', purchase.address);
    }

    return formData;

}
function formatDate(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}