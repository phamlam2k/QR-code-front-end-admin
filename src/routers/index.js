import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import Loading from "../components/page/Loading"
import Student from "../components/student/Student"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import { routes } from "./routes"

const AppRouter = () => {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Switch>
                    {routes.map((route, key) =>{
                        const { path, exact, isPrivate, component, isTeacher, restricted } = route
                        const props = {
                            key, 
                            path,
                            exact,
                            isTeacher,
                            component : lazy(() => new Promise(resolve => setTimeout(() => resolve(component), 1000)))
                        }
                        return isPrivate ? <PrivateRoute {...props} /> : <PublicRoute {...props} restricted={restricted} />
                    })}
                    <PrivateRoute component={Student} />
                </Switch>
            </Suspense>
        </Router>
    )
}

export default AppRouter
