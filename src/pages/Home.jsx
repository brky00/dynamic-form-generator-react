import React, { useState } from "react";
import FormBuilder from "../components/FormBuilder";
import FormPreview from "../components/FormPreview";

export default function Home() {
  const [formFields, setFormFields] = useState([]);

  return (
    <div className="d-flex justify-content-center  min-vh-100 bg-light">
      <div className="container mt-5 d-flex justify-content-center">
        <div className="row">
          <div className="col-md-6">
            <FormBuilder
              formFields={formFields}
              setFormFields={setFormFields}
            />
          </div>
          <div className="col-md-6">
            <FormPreview formFields={formFields} />
          </div>
        </div>
      </div>
    </div>
  );
}
