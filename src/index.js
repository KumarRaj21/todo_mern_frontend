import {createRoot} from "react-dom/client"
import App from "./App"
import {BrowserRouter as Router} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
createRoot(
  document.getElementById("root")
).render(<Router><App /><ToastContainer/></Router>)