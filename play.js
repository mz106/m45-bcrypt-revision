const myStr = "hello"; //truthy

const emptyStr = ""; //falsy

const myFunc = (str) => {
  if (!str) {
    console.log("its falsy");
  } else {
    console.log("its truthy");
  }
};

myFunc(myStr);
myFunc(emptyStr);
