/* by AbdelmalekBouguerra */
/**
 * rename a key in provided json object.
 * @param obj JSON object to rename
 * @param oldKey String key to rename
 * @param newKey String new key name
 */
var renameKey = (obj, oldKey, newKey) => {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
};

module.exports = { renameKey };
