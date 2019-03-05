import React from "react";
import Form from "react-jsonschema-form";
import { Button } from "@material-ui/core";

import createSchema from "./createSchema";

const FormReaction = ({ reaction, dispatch, handleSubmit }) => {
  const schema = createSchema(reaction);

  schema.title = "Configurer la réaction";

  const _handleSubmit = ({ formData }, e) => {
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
    dispatch({ type: "dataReaction", value: formData });
    handleSubmit();
  };

  return (
    <div className="form-style">
      <Form schema={schema} onSubmit={_handleSubmit}>
        <Button type="submit" variant="contained" color="primary">
          Valider
        </Button>
      </Form>
    </div>
  );
};

export default FormReaction;
