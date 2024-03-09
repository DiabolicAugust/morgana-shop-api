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

export const Strings = {
  //Validation
  fieldCantBeEmpty: (field: Fields) => `${field} cant be empty!`,
  fieldMustBeString: (field: Fields) => `${field} must be a string!`,
  fieldMustBeNumber: (field: Fields) => `${field} must be a number!`,
  fieldMustBeBoolean: (field: Fields) => `${field} must be boolean!`,
  incorrectEmailFormat: "Incorrect email format!",
};
