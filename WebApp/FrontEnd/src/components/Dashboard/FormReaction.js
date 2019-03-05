import React from "react";
import Form from "react-jsonschema-form";
import {Button} from '@material-ui/core';

import createSchema from "./createSchema";

const FormReaction = ({ reaction, dispatch }) => {
  const schema = createSchema(reaction);

  schema.title = "Configurer la réaction";


  const handleSubmit = ({ formData }, e) => {
    for (const i in formData) {
      if (!formData[i]) {
        dispatch({type: "alertError", value: true});
        dispatch({type: "setError", value: "Merci de remplir tous les champs"});
        return;
      }
    }
    dispatch({type: "dataReaction", value: formData});
    dispatch({type: "submit"});
  };

  return (
    <div className="form-style">
      <Form schema={schema} onSubmit={handleSubmit}>
        <Button type="submit" variant="contained" color="primary">
          Valider
        </Button>
      </Form>
    </div>
  );
};

export default FormReaction;
