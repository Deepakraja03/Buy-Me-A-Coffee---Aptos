import { AptosClient } from "aptos";

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");

export const fetchViewFunction = async () => {
  try {
    const result = await client.view({
      function: "0xb79920fdc8ef2b365c789fe8b5c14b382e57463f17961c1c547af1ae176953e9::Coffee::get_all_coffee",
      type_arguments: [],
      arguments: [],
    });
    return result;
  } catch (error) {
    console.error("Error calling view function:", error);
    return null;
  }
};

export const fetchViewFunctionByAddress = async (walletAddress : String) => {
  try {
    const result = await client.view({
      function: "0xb79920fdc8ef2b365c789fe8b5c14b382e57463f17961c1c547af1ae176953e9::Coffee::get_coffee_by_address",
      type_arguments: [],
      arguments: [walletAddress],
    });
    return result;
  } catch (error) {
    console.error("Error calling view function:", error);
    return null;
  }
};
