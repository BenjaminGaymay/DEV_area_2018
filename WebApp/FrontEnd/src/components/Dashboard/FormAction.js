import React from "react";
import Form from "react-jsonschema-form";
import { Button } from "@material-ui/core";
import createSchema from "./createSchema";

const FormAction = ({ action, dispatch }) => {
  const schema = createSchema(action);

  const handleSubmit = ({ formData }, e) => {
    for (const i in formData) {
      if (!formData[i]) {
        dispatch({ type: "alertError", value: true });
        dispatch({
          type: "setError",
          title: "Attention",
          subtitle: "Merci de remplir tous les champs"
        });
        return;
      }
    }
    dispatch({ type: "mode", value: "reaction" });
    dispatch({ type: "dataAction", value: formData });
  };

  return (
    <div className="form-style">
      <Form schema={schema} onSubmit={handleSubmit}>
        <Button type="submit" variant="contained" color="primary">
          Configurer réaction
        </Button>
      </Form>
    </div>
  );
};

export default FormAction;
