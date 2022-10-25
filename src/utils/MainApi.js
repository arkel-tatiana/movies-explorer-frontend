import * as constant from './Constant'

                                
export const register = (name, email, password) => {
  return fetch(`${constant.BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, password, email})
  })
  .then((response) => {
        return response.json();
  })
};

export const authorize = (email, password) => {
  return fetch(`${constant.BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    return response.json();
  })
};

export const checkToken = (token) => {
    return fetch(`${constant.BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
    }
    })
    .then((res) => {
        return res.json();
    })
}

export const getUserData = () => {
    return fetch(`${constant.BASE_URL}/users/me`, {
        method: 'GET',    
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
            'Content-Type': 'application/json'
    },
    })
    .then(getResponseData)
};

export const  editUserData = (formData) => {
    return fetch(`${constant.BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email
        })
    })
    .then(getResponseData)
}
export const getSaveMovies = () => {
    return fetch(`${constant.BASE_URL}/movies`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(getResponseData)
}

export const savedMovie = (dataMovie) => {
    return fetch(`${constant.BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nameRU: dataMovie.nameRU,
            country: dataMovie.country,
            director: dataMovie.director,
            duration: dataMovie.duration,
            year: dataMovie.year,
            description: dataMovie.description,
            image: dataMovie.image.url,
            trailerLink: dataMovie.trailerLink,
            thumbnail: dataMovie.image.formats.thumbnail.url,
            movieId: dataMovie.id,
            nameEN: dataMovie.nameEN
        })
    })
    .then(getResponseData)
};

export const deleteMovie = (dataMovie) => {
    return fetch(`${constant.BASE_URL}/movies/${dataMovie._id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
    .then(getResponseData)
};


const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}