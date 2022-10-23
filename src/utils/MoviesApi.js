
const BASE_URL_BEATFILM = 'https://api.nomoreparties.co/beatfilm-movies'
export const getMovies = (name, email, password) => {
    return fetch(`${BASE_URL_BEATFILM}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(getResponseMovies)
};
const getResponseMovies = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}