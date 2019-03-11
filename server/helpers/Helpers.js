class Helpers {
  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items The array containing the items.
   */
  static shuffle(array) {
    const tempArray = array;
    let counter = tempArray.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      const index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter -= 1;

      // And swap the last element with it
      const temp = tempArray[counter];
      tempArray[counter] = tempArray[index];
      tempArray[index] = temp;
    }

    return tempArray;
  }
}

export default Helpers;
