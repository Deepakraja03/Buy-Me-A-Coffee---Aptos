import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

// Function to create an entry with the new arguments
export type CreateArguments = {
    name: string, 
    message: string, 
    value: number
};

export const createEntry = (args: CreateArguments): InputTransactionData => {
  const { name, message, value } = args;
  return {
    data: {
      function: "0xb79920fdc8ef2b365c789fe8b5c14b382e57463f17961c1c547af1ae176953e9::Coffee::buyCoffee",
      functionArguments: [name, message, value],
    },
  };
};
