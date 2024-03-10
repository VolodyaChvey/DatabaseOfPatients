
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Components/Layout';
import StartPage from "./Pages/StartPage";
import { SinglePatient, patientLoader } from "./Pages/SinglePatient";
import { Patients, patientsLoader } from './Pages/Patients';
import ErrorPage from './Pages/ErrorPage';
import { AddPatient, newPatientAction } from "./Pages/AddPatient";
import DeletePatient from "./Pages/DeletePatient";
import { NewDisease, diseasesLoader } from "./Pages/NewDisease";
import { Diagnoses, diagnosesLoader } from "./Pages/Diagnoses";
import CreatePattern from "./Pages/CreatePattern";
import {NewVisit, visitLoader} from "./Pages/NewVisit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<StartPage />} />
      <Route path="patients" element={<Patients />} loader={patientsLoader} errorElement={<ErrorPage />} />
      <Route path="patients/:id" element={<SinglePatient />} loader={patientLoader} />
      <Route path="patients/new" element={<AddPatient />} action={newPatientAction} />
      <Route path="patients/:id/delete" element={<DeletePatient />} />
      <Route path="diseases/patientId/:id" element={<NewDisease />} loader={diseasesLoader} />
      <Route path="diseases" element={<Diagnoses />} loader={diagnosesLoader} />
      <Route path="pattern/new" element={<CreatePattern />} />
      <Route path="visits/patientId/:id" element={<NewVisit/>} loader={visitLoader}/>
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}