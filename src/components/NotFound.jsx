import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div style={{margin:'300px'}}>
            <h1>404 - Could not find route!</h1>

            <p>Go back to <Link to="/">Home</Link></p>
        </div>
    )
}

export default NotFound