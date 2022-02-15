import { Redirect } from "react-router-dom"
import { Route } from "react-router-dom"
import { isLogin } from "../config/function"
import { ADMIN_STUDENT } from "../config/path"


const PublicRoute = ({component : Component, restricted, ...rest}) => {
    return (
        <Route 
            {...rest}
            component={(props) => 
                isLogin() && restricted ? <Redirect to={ADMIN_STUDENT}/> : <Component {...props}/>
            }
        />
    )
}

export default PublicRoute
