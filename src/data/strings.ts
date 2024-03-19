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
}

//Key must be a name of a model, or Error handler can may break !!!
export enum Models {
  ProductBasket = "Product Basket",
  Product = "Product",
}

export const Strings = {
  //Validation
  fieldCantBeEmpty: (field: Fields) => `${field} cant be empty!`,
  fieldMustBeString: (field: Fields) => `${field} must be a string!`,
  fieldMustBeNumber: (field: Fields) => `${field} must be a number!`,
  fieldMustBeBoolean: (field: Fields) => `${field} must be boolean!`,
  incorrectEmailFormat: "Incorrect email format!",
  objectNotFoundById: (model: Models, id: string) =>
    `No ${model} have been found by this id: ${id}!`,

  //Errors
  somthingWentWrong: "Something went wrong",
  basketDoesntContainProduct: (id: string) =>
    `This Product Basket does not contain the product with provided ${id}`,
};
