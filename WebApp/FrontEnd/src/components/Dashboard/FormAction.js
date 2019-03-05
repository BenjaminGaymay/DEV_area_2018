import React from "react";
import Form from "react-jsonschema-form";
import { Button } from "@material-ui/core";
import createSchema from "./createSchema";

const FormAction = ({ action, setMode }) => {
  const schema = createSchema(action);

  const handleSubmit = ({formData}, e) => {
    console.log(formData);
    setMode("reaction");
  }

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
