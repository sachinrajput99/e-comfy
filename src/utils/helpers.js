// price is taken as number in parameter(argument)

// increasing decreasing items in cart and total calculation takes place in cents
export const formatPrice = (number) => {
  //    The Intl.NumberFormat object enables language-sensitive number formatting.
  const newNumber = new Intl.NumberFormat(`en-IN`, {
    style: `currency`,
    currency: `USD`, //changes the type of currency
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  // dynamically accessing the value in object using bracket notation{
  let unique = data.map((item) => item[type]);
  // console.log(data);//data is array of object
  // console.log(unique);
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)]; //returns array of unique value
};
