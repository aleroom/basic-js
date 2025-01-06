const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const fileMap = {};  // Object to track occurrences of base file names
  const result = [];    // Array to store the final filenames

  for (const name of names) {
    if (!fileMap[name]) {
      // If the name is not used yet, add it directly
      fileMap[name] = 1;  // Mark the base name as used
      result.push(name);
    } else {
      // Handling duplicates
      let newName = name;
      let suffix = 1; // Start with suffix (1)
      
      // Keep incrementing until we find an unused filename
      while (fileMap[newName]) {
        newName = `${name}(${suffix})`;  // Create new name with suffix
        suffix++; // Increment the suffix for the next iteration
      }
      
      // Add the new name to the result
      fileMap[newName] = 1; // Mark the new name as used
      result.push(newName);
    }
  }
  return result;
}

module.exports = {
  renameFiles
};
