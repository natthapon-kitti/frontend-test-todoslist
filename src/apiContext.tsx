import { apiService } from './controller/apiService';
import { useContext, createContext, type ReactNode } from "react"

const ApiContext = createContext({} as typeof apiService)

// eslint-disable-next-line react-refresh/only-export-components
export const useApi = () => {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error("useApi must be used within an ApiProvider")
    }
    return context
}


const ApiProvider = ({ children }: { children: ReactNode }) => {

    const api = apiService

    return (
        <ApiContext.Provider value= { api } >
        { children }
        </ApiContext.Provider>
    )
}


export default ApiProvider
