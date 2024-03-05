export enum Fields {
  Username = 'Username',
  Email = 'Email',
  Password = 'Password',
}

export const Strings = {
  //Validation
  fieldCantBeEmpty: (field: Fields) => `${field} cant be empty!`,
  fieldMustBeString: (field: Fields) => `${field} must be a string!`,
  incorrectEmailFormat: 'Incorrect email format!',
};
