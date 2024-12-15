import { APTOS_MOVE_MODULE_ADDR } from "@/constants";
import { AptosClient } from "aptos";

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");

export const fetchViewFunction = async () => {
  try {
    const result = await client.view({
      function: `${APTOS_MOVE_MODULE_ADDR}::Coffee::get_all_coffee`,
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
      function: `${APTOS_MOVE_MODULE_ADDR}::Coffee::get_coffee_by_address`,
      type_arguments: [],
      arguments: [walletAddress],
    });
    return result;
  } catch (error) {
    console.error("Error calling view function:", error);
    return null;
  }
};
