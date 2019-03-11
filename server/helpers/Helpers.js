class Helpers {
  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items The array containing the items.
   */
  static shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }
}

export default Helpers;