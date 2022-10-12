import './pageNotFound.css'
import React from 'react';
import { Link, useHistory} from 'react-router-dom'

function PageNotFound() {
    const history = useHistory();
    return (
        <div className="pageNotFound">
            <h3 className="pageNotFound__title">404</h3>
            <p className="pageNotFound__text">Страница не найдена</p>  
            <button className="pageNotFound__button" type="button" aria-label="Назад" 
                onClick={() => history.goBack()}>Назад</button>
        </div>
    );
}

export default PageNotFound;