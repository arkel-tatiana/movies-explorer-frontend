import './error.css'

function Error ({errorMessage, errorTopPozishion}) {
    return (
        <p className="errorMessage" style={{ top:`${errorTopPozishion}px` }}>{errorMessage}</p>
    );
}

export default Error;