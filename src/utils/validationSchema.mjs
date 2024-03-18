// ONLY WORKS FOR REQUEST BODY!
export const createUserValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "username must not be empty",
    },
    isLength: {
      options: {
        min: 5,
        max: 25,
      },
      errorMessage: "username must be between 5 - 25 characters",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
  nickName: {
    notEmpty: {
      errorMessage: "nickName must not be empty",
    },
    isLength: {
      options: {
        min: 5,
        max: 25,
      },
      errorMessage: "nickName must be between 5 - 25 characters",
    },
    isString: {
      errorMessage: "nickName must be a string",
    },
  },
};