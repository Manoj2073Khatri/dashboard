import {
  Route, Routes
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import SignUp from "./components/signUp";
import { PageNotFound } from "./pages/404Page/404Page";
import Configuration from "./pages/configuration/configuration";
import { Dashboard } from "./pages/dashboard/dashboard";
import { EditAdmin } from "./pages/admins/components/editAdmins"
import ViewDocuments from "./pages/extracteddocuments/components/viewDocuments";
import Admins from "./pages/admins/admins";
import ExtractedDocuments from "./pages/extracteddocuments/extracteddocuments";
import RequireAuth from "./services/requireAuth";
import { CreateAdmin } from "./pages/admins/components/createAdmin";

//toastify  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="login" element={<SignUp />} />
          <Route index element={<SignUp />} />
          <Route path="" element={<RequireAuth />}>

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="admins" element={<Admins />} />
            <Route path="extractedDocuments" element={< ExtractedDocuments />} />
            <Route path="admins/edit/:editId" element={< EditAdmin />} />
            <Route path="extractedDocuments/edit/:Id" element={< ViewDocuments />} />
            <Route path="admins/createAdmin" element={<CreateAdmin />} />
            {/* <Route path="*" element={<PageNotFound />} /> */}

          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>

  );
}

export default App;
