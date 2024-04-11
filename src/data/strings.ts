export enum Fields {
  Username = "Username",
  Email = "Email",
  Password = "Password",
  Title = "Title",
  Description = "Description",
  Price = "Price",
  isOnSale = "IsOnSale",
  salePrice = "SalePrice",
  quantity = "Quantity",
  category = "Category",
}

//Key must be a name of a model, or Error handler can may break !!!
export enum Models {
  User = "User",
  ProductBasket = "Product Basket",
  Product = "Product",
  Wishlist = "Wishlist",
  Category = "Category",
}

export const Strings = {
  //Validation
  fieldCantBeEmpty: (field: Fields) => `${field} cant be empty!`,
  fieldMustBeString: (field: Fields) => `${field} must be a string!`,
  fieldMustBeNumber: (field: Fields) => `${field} must be a number!`,
  fieldMustBeBoolean: (field: Fields) => `${field} must be boolean!`,
  objectWithFieldAlreadyExists: (model: Models, field: Fields) =>
    `${model} with the same ${field.toLowerCase()} already exists. You can't add another one!`,
  incorrectEmailFormat: "Incorrect email format!",
  objectNotFoundById: (model: Models, id: string) =>
    `No ${model} have been found by this id: ${id}!`,
  userNotAllowedToDoThis: "This user is not allowed to do this!",

  //Errors
  somethingWentWrong: "Something went wrong",
  basketDoesntContainProduct: (id: string) =>
    `This Product Basket does not contain the product with provided ${id}`,
  yourModelContainsObject: (firstModel: Models, secondModel: Models) =>
    `${firstModel} already contains this ${secondModel}!`,
  yourModelDoesntContainObject: (firstModel: Models, secondModel: Models) =>
    `${firstModel} doesn't contain this ${secondModel}!`,

  capitalizeFirstLetterAndRemoveSymbols(str) {
    const parts = str.split("-");

    const capitalizedParts = parts.map((part) => {
      const capitalizedPart = part.charAt(0).toUpperCase() + part.slice(1);
      return capitalizedPart;
    });

    const capitalizedStr = capitalizedParts.join("");

    return capitalizedStr;
  },
};
