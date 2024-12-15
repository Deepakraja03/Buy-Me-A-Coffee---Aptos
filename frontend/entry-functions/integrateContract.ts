import { APTOS_MOVE_MODULE_ADDR } from "@/constants";
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
      function: `${APTOS_MOVE_MODULE_ADDR}::Coffee::buyCoffee`,
      functionArguments: [name, message, value],
    },
  };
};
