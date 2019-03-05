const createSchema = obj => {
  let options = {
    title: "Configurer l'action",
    type: "object",
    properties: {}
  };

  const newConfig = {};
  for (const i in obj.config) {
    let tmp = obj.config[i];
    if (tmp.type === "checkbox") {
      tmp.type = "string";
    }
    if (tmp.label) {
      tmp.title = tmp.label;
    }
    if (tmp.values) {
      console.log(tmp.values);
      for (let it = 0; it < tmp.values.length; it++) {
        if (tmp.values[it] === "") {
          tmp.values[it] = "All";
        }
      }
      tmp.enum = tmp.values;
    }
    newConfig[i] = tmp;
  }
  options["properties"] = newConfig;
  return options;
};

export default createSchema;
