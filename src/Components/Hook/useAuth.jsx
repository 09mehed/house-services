import { useContext } from "react"
import AuthContext from "../../Providers/Authcontext"

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}
export default useAuth;