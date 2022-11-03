import * as constant from './Constant'

export const getMovies = () => {
    return fetch(`${constant.BASE_URL_BEATFILM}`, {
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