import { Routes, Route } from "react-router-dom";
import Splash from "../../pages/Splash";
import Documents from "../../pages/Documents";
import Document from "../../pages/Document";
import Login from "../../pages/Login";
import NewDoc from "../../pages/NewDoc";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Splash />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/documents/:docId" element={<Document />} />
      <Route path="/login" element={<Login />} />
      <Route path="/new-document" element={<NewDoc />} />
    </Routes>
  );
};