import React from "react";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import {AuthProvider,useAuth} from "./context/AuthContext";

function PrivateRoute({children}){
const {isAuthenticated}=useAuth();
return isAuthenticated ? children : <Navigate to="/"/>;
}

export default function App(){
return(
<AuthProvider>
<BrowserRouter>
<Routes>

<Route path="/" element={<LoginPage/>}/>

<Route path="/list" element={
<PrivateRoute>
<ListPage/>
</PrivateRoute>
}/>

<Route path="/details/:id" element={
<PrivateRoute>
<DetailsPage/>
</PrivateRoute>
}/>

<Route path="/analytics" element={
<PrivateRoute>
<AnalyticsPage/>
</PrivateRoute>
}/>

</Routes>
</BrowserRouter>
</AuthProvider>
)
}