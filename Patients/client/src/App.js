
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Components/Layout';
import StartPage from "./Pages/StartPage";
import { SinglePatient, patientLoader } from "./Pages/SinglePatient";
import { Patients, patientsLoader } from './Pages/Patients';
import ErrorPage from './Pages/ErrorPage';
import AddPatient from "./Pages/AddPatient";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<StartPage />} />
      <Route path="patients" element={<Patients />} loader={patientsLoader} errorElement={<ErrorPage />} />
      <Route path="patients/:id" element={<SinglePatient />} loader={patientLoader} />
      <Route path="patients/new" element={<AddPatient/>}/>
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}