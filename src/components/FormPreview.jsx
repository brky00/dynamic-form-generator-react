export default function FormPreview({ formFields }) {
  if (formFields.length === 0) {
    return <h4 className="text-center">No form fields added yet</h4>;
  }
  return (
    <div>
      <h4>Form Preview</h4>
      <form>
        {formFields.map((field) => (
          <div className="mb-3" key={field.id}>
            {/* Feltoverskrift */}
            <label className="form-label">{field.label}</label>

            {/* Tekst, tall og dato */}
            {field.type === "text" ||
            field.type === "number" ||
            field.type === "date" ? (
              <input
                type={field.type}
                className="form-control"
                required={field.required}
                minLength={field.minLength}
                maxLength={field.maxLength}
                min={field.min}
                max={field.max}
                pattern={field.pattern}
              />
            ) : field.type === "checkbox" ? (
              <>
                {/* Bruk feltets label som overskrift */}
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`checkbox-${field.id}`}
                    required={field.required}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`checkbox-${field.id}`}
                  >
                    {field.extravalue || "Option"}
                  </label>
                </div>
              </>
            ) : field.type === "dropdown" ? (
              <select className="form-select" required={field.required}>
                {field.options.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            ) : null}
          </div>
        ))}

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
