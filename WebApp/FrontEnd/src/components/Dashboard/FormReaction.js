import React from "react";
import Form from "react-jsonschema-form";
import {Button} from '@material-ui/core';

import createSchema from "./createSchema";

const FormReaction = ({ reaction }) => {
  const schema = createSchema(reaction);

  schema.title = "Configurer la réaction";
  const handleSubmit = ({ formData }, e) => {
    console.log(formData);
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
