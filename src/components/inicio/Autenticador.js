import { Navigate, Outlet } from "react-router-dom"

export const ProtegerRutas=({
    isAllowed,
    children,
})=>{

    if(!isAllowed) return <Navigate to ={"/"}  replace/>;

    return children? children: <Outlet />
}