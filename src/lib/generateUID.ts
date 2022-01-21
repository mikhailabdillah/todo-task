const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
// const symbols = "!@#$%^&*_-+=";

const generateUID = (length: number) => {
  const characters = lowercase + uppercase + numbers;
  let password: string = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length)
    );
  }
  return password;
};

export { generateUID };
