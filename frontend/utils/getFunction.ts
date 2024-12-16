import { APTOS_MOVE_MODULE_ADDR } from "@/constants";
import { AptosClient } from "aptos";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
 
const config = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(config);

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

export const fetchBalance = async (walletAddress : string) => {
  try {
    const coinType = "0x1::aptos_coin::AptosCoin";
    const [balanceStr] = await aptos.view<[string]>({
      payload: {
        function: "0x1::coin::balance",
        typeArguments: [coinType],
        functionArguments: [walletAddress]
      }
    });
    const balance = parseInt(balanceStr, 10);
    return {balance: balance, balanceStr: balanceStr};
  } catch (error) {
    console.error("Error calling view function:", error);
    return null;
  }
};
