
import Home from './pages/home/Home'
import Register from "./pages/register/Register";
import Login from './pages/login/Login'
import { Route, Routes ,Outlet, useNavigate} from 'react-router-dom'
import { useEffect, useState, createContext } from 'react'
import axios from './AxiosConfig'
import Question from './pages/question/Question';
import DetailQuestion from './pages/home/detailQuestion/DetailQuestion';
import Header from './pages/header/Header';
import Footer from './pages/footer/Footer';

 export const AppState = createContext()

function App() {

  const [user , setUser] = useState({});

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  async function checkUser(){
   try {
    const {data} = await axios.get('/users/check',{
      headers:{
        Authorization: 'Bearer ' + token,
     },
    })
    setUser(data )
   } catch (error) {
    console.log(error.response)
    navigate("/login");
   }
   }

  useEffect(()=> {
   checkUser();

  },[navigate])  
 
  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header/> <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/question" element={<Question />} />
          <Route path="/question/:questionid" element={<DetailQuestion />} />
        </Route>
      </Routes>
    </AppState.Provider>
  );
}

export default App
