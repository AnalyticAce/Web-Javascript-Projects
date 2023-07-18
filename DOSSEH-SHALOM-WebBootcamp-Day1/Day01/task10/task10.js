function displayProperty(obj, propName)
{
  if (obj.hasOwnProperty(propName)) {
      console.log(propName + " : " + obj[propName]);
  } else {
      console.log(`Property ${propName} does not exist in the object`);
  }
}

module.exports = {displayProperty}
