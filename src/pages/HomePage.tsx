import { useEffect } from "react";


const HomePage = () => {

    useEffect(() => {
     window.location.href='/auth/login'
    
    }, [])
    
    return (<div align="center">
        <h1>Home page</h1>
    </div>);
}

export default HomePage;