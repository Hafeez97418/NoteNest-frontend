export const catchAsyncErrors = (func: Function) => {
  try {
    return func();
  } catch (error) {
    console.log(error);
  }
};
