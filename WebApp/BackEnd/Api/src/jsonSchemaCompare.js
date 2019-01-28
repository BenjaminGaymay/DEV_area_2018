export function jsonCompare(json, schema) {
    let oJson;
    let oSchema;
    let result = true;
    try {
        oJson = JSON.parse(json);
        oSchema = JSON.parse(schema);
    } catch (e) {
        console.log(e);
        console.log("Not JSON");
        return false;
    }
    Object.keys(oSchema).forEach(function (k) {
        if (!oJson.hasOwnProperty(k)) {
            console.log(`La variable \"${k}\" est manquante.`);
            result = false;
            return false;
        } else if (typeof oJson[k] !== typeof oSchema[k]) {
            console.log(`Les types de \"${k}\" sont incompatibles.`);
        }
    });
    return result;
}