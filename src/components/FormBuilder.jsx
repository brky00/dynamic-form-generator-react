import { fieldTypes } from "../data/fieldTypes";

export default function FormBuilder({ formFields, setFormFields }) {
  //after click on button addField will be called
  const addField = (type, label) => {
    const newField = {
      id: Date.now(),
      type,
      label: `${label} Field`,
      required: false,
      options: type === "dropdown" ? ["Option 1", "Option 2"] : [],
      extravalue: type === "checkbox" ? "Option" : undefined, // Add extravalue for checkbox
    };
    setFormFields([...formFields, newField]);
    console.log("added", formFields);
  };

  //func for update after onChange event
  const updateField = (index, updatedField) => {
    setFormFields(
      formFields.map((field, i) => (i === index ? updatedField : field))
    );
    console.log("updated", formFields);
  };

  const removeField = (index) => {
    setFormFields(formFields.filter((_, i) => i !== index));
    console.log("removed", formFields);
  };

  return (
    <div>
      <h4>Form Builder</h4>
      <div className="mb-2">
        {fieldTypes.map((f) => (
          <button
            key={f.type}
            className="btn btn-outline-primary btn-sm me-2 mb-2"
            onClick={() => addField(f.type, f.label)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="list-group">
        {formFields?.map((field, index) => (
          <div key={field.id} className="list-group-item">
            {/* Conditional input for checkbox: label and extravalue */}
            {field.type === "checkbox" ? (
              <>
                <input
                  className="form-control mb-2"
                  value={field.label}
                  onChange={(e) =>
                    updateField(index, { ...field, label: e.target.value })
                  }
                  placeholder="Checkbox Title"
                />
                <input
                  className="form-control mb-2"
                  value={field.extravalue || ""}
                  onChange={(e) =>
                    updateField(index, {
                      ...field,
                      extravalue: e.target.value,
                    })
                  }
                  placeholder="Checkbox Value Label"
                />
              </>
            ) : (
              // Default label input for all other field types
              <input
                className="form-control mb-2"
                value={field.label}
                onChange={(e) =>
                  updateField(index, { ...field, label: e.target.value })
                }
                placeholder="Label"
              />
            )}

            {/* Dropdown options textarea */}
            {field.type === "dropdown" && (
              <textarea
                className="form-control mb-2"
                value={field.options.join("\n")}
                onChange={(e) =>
                  updateField(index, {
                    ...field,
                    options: e.target.value.split("\n"),
                  })
                }
                placeholder="Dropdown options (one per line)"
              />
            )}

            {/* Validation fields for text/textarea/number */}
            {(field.type === "text" ||
              field.type === "textarea" ||
              field.type === "number") && (
              <div className="row">
                <div className="col">
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Min Length"
                    value={field.minLength || ""}
                    onChange={(e) =>
                      updateField(index, {
                        ...field,
                        minLength: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Max Length"
                    value={field.maxLength || ""}
                    onChange={(e) =>
                      updateField(index, {
                        ...field,
                        maxLength: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* Required checkbox */}
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={field.required}
                onChange={(e) =>
                  updateField(index, { ...field, required: e.target.checked })
                }
              />
              <label className="form-check-label">Required</label>
            </div>

            <button
              className="btn btn-sm btn-danger mt-2"
              onClick={() => removeField(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
