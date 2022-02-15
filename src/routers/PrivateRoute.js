import { Redirect } from "react-router-dom"
import { Route } from "react-router-dom"
import { ROLE_TEACHER } from "../config/const"
import getRole, { isLogin } from "../config/function"
import { ADMIN_LOGIN, ADMIN_STUDENT } from "../config/path"


const PrivateRoute = ({component: Component, isTeacher, ...rest }) => {
    const role = getRole()
    return (
        <Route 
            {...rest}
            component={(props) => 
                !isLogin() ? 
                <Redirect to={ADMIN_LOGIN}/> 
                    : (!isTeacher && role === ROLE_TEACHER) 
                        ? <Redirect to={ADMIN_STUDENT} />
                            :<Component {...props}/>
            }
        />
    )
}

export default PrivateRoute
