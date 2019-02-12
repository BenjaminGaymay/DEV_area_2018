/**
 * @param str
 * @returns {boolean}
 * @constructor
 */
export function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * @param data
 * @returns {*}
 */
export function convertData(data) {
    if (typeof data !== "object")
        return data;
    for (let i in data) {
        if (IsJsonString(data[i])) {
            data[i] = JSON.parse(data[i]);
            //data[i] = convertData(data[i]);
        }
    }
    return data;
}

/**
 * @param result
 * @returns {*}
 */
export function keepPreviousDataIfTheyAreRegisteredInTheBddBucket(result) {
    /* On garde certaines data de la précédante requetes, config en BDD */
    if (result.reaction.config.hasOwnProperty('bucket') && result.reaction.config.bucket != null) {
        for (let i in result.action.data) {
            if (!result.reaction.config.bucket.includes(i))
                delete result.action.data[i];
        }
    } else { /* Sinon on garde rien */
        result.action.data = {};
    }
    return result;
}

export function changeNameWithConfig(result) {
    if (!result.action.config.hasOwnProperty("transform"))
        return result;
    for (let item in result.action.config.transform) {
        if (result.action.data.hasOwnProperty(item)) {
            let tmp = result.action.data[item];
            delete result.action.data[item];
            result.action.data[result.action.config.transform[item]] = tmp;
        }
    }
    return result;
}

export function postTraitement(result) {
    result.action.config = convertData(result.action.config);
    result.reaction.config = convertData(result.reaction.config); // convert all string to json
    /** do post traitement **/
    result = changeNameWithConfig(result);
    result = keepPreviousDataIfTheyAreRegisteredInTheBddBucket(result);
    let configData = result.reaction.config;
    configData.data = result.action.data;
    return configData;
}

export function getSchema(schema, type, widget = undefined) {
    if (typeof schema === "undefined") return null;
    if (typeof type == "undefined") return schema;
    switch (type) {
        case "action":
            return typeof widget === "undefined" ? schema.action : schema.action[widget];
        case "reaction":
            return typeof widget === "undefined" ? schema.reaction : schema.reaction[widget];
        default:
            return null;
    }
}