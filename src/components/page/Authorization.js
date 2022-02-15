import bg_lock from '../../assets/img/lock.png';
import './Authorization.css'

const Authorization = () => {

    return (
        <div className="authorization">
            <div className="authorization-circle">
                <div className="authorization-circle-animation"></div>
                <img src={bg_lock} alt="lock" className='authorization-img'/>
                <h1>You can not access this website</h1>
            </div>
        </div>
    )
}

export default Authorization
