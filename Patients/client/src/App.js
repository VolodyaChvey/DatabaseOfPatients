
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Components/Layout';
import StartPage from "./Pages/StartPage";
import { SinglePatient, patientLoader } from "./Pages/SinglePatient";
import { Patients, patientsLoader } from './Pages/Patients';
import ErrorPage from './Pages/ErrorPage';
import { AddPatient, newPatientAction } from "./Pages/AddPatient";
import { EditPatient, updatePatientAction } from "./Pages/EditPatient";
import DeletePatient from "./Pages/DeletePatient";
import { NewDisease, diseasesLoader } from "./Pages/NewDisease";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<StartPage />} />
      <Route path="patients" element={<Patients />} loader={patientsLoader} errorElement={<ErrorPage />} />
      <Route path="patients/:id" element={<SinglePatient />} loader={patientLoader} />
      <Route path="patients/new" element={<AddPatient />} action={newPatientAction} />
      <Route path="patients/:id/edit" element={<EditPatient />} action={updatePatientAction} loader={patientLoader} />
      <Route path="patients/:id/delete" element={<DeletePatient />} />
      <Route path="diseases/:id" element={<NewDisease />} loader={diseasesLoader} />
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}