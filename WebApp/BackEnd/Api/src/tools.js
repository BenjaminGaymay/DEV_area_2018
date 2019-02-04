
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
    for (let i in data) {
        if (IsJsonString(data[i])) {
            data[i] = JSON.parse(data[i]);
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
    if (result.subscribe.reaction.config.hasOwnProperty('bucket') && result.subscribe.reaction.config.bucket != null) {
        for (let i in result.bucket) {
            if (!result.subscribe.reaction.config.bucket.includes(i))
                delete result.bucket[i];
        }
    } else { /* Sinon on garde rien */
        result.bucket = {};
    }
    return result;
}