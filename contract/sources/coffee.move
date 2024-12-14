module deployer_addr::Coffee {

  // lib
  use std::signer;
  use std::string::{String};
  use aptos_std::table::{Self, Table};
  use std::vector;
  use aptos_framework::coin;
  use aptos_framework::aptos_coin::AptosCoin;


  // #[test_only]
  // use std::debug;
  // #[test_only]
  // use std::string::{Self};
  
  // struct required - resources
  struct CoffeeList has key {
      coffees: Table<u64, CoffeeDetail>,
      coffee_counter: u64
  }

  struct CoffeeDetail has store, drop, copy {
      donater_addr: address,
      name: String,
      message: String,
      value: u64
  }

  // Error handling
  const E_RESOURCE_NOT_EXISTS: u64 = 1;
  const E_INSUFFICIENT_FUNDS: u64 = 2;

  // write functions

  public entry fun initialize(account: &signer) {
      let deployer_addr = @deployer_addr;
      
      assert!(signer::address_of(account) == deployer_addr, E_RESOURCE_NOT_EXISTS);

      if(!exists<CoffeeList>(deployer_addr)) {
          let manager = CoffeeList {
              coffees: table::new(),
              coffee_counter: 0
          };
          move_to(account, manager);
      }
  }

  public entry fun buyCoffee(account: &signer, name: String, message: String, value: u64) acquires CoffeeList {
      let deployer_addr = @deployer_addr;
      let user = signer::address_of(account);
      assert!(exists<CoffeeList>(deployer_addr), E_RESOURCE_NOT_EXISTS);

      let coffee_list = borrow_global_mut<CoffeeList>(deployer_addr);

      let coffee_detail = CoffeeDetail {
          donater_addr: signer::address_of(account),
          name: name,
          message: message,
          value: value
      };

      assert!(coin::balance<AptosCoin>(user) >= coffee_detail.value, E_INSUFFICIENT_FUNDS);
      coin::transfer<AptosCoin>(account, deployer_addr, coffee_detail.value);

      table::add(&mut coffee_list.coffees, coffee_list.coffee_counter, coffee_detail);
      coffee_list.coffee_counter = coffee_list.coffee_counter + 1;
  }

  #[view]
  public fun get_coffee_by_id(coffee_id: u64): CoffeeDetail acquires CoffeeList{
      let deployer_addr = @deployer_addr;
      assert!(exists<CoffeeList>(deployer_addr), E_RESOURCE_NOT_EXISTS);

      let coffee_list = borrow_global<CoffeeList>(deployer_addr);
      *table::borrow(&coffee_list.coffees, coffee_id)
  }

  #[view]
  public fun get_coffee_by_address(coffee_address: address): vector<CoffeeDetail> acquires CoffeeList{
      let deployer_addr = @deployer_addr;
      assert!(exists<CoffeeList>(deployer_addr), E_RESOURCE_NOT_EXISTS);

      let coffee_list = borrow_global<CoffeeList>(deployer_addr);

      let matching_coffees = vector::empty<CoffeeDetail>();
      
      let counter = 0;
      while(counter < coffee_list.coffee_counter) {
          if(table::contains(&coffee_list.coffees, counter)) {
              let coffee_ref = table::borrow(&coffee_list.coffees, counter);
              if(coffee_ref.donater_addr == coffee_address){
                  vector::push_back(&mut matching_coffees, *coffee_ref);
              }
          };
          counter = counter + 1;
      };
      matching_coffees
  }

  #[view]
  public fun get_all_coffee(): vector<CoffeeDetail> acquires CoffeeList{
      let deployer_addr = @deployer_addr;
      assert!(exists<CoffeeList>(deployer_addr), E_RESOURCE_NOT_EXISTS);

      let coffee_list = borrow_global<CoffeeList>(deployer_addr);
      let all_coffees = vector::empty<CoffeeDetail>();
      let counter = 0;
      while(counter < coffee_list.coffee_counter) {
          if(table::contains(&coffee_list.coffees, counter)) {
              let coffee_ref = table::borrow(&coffee_list.coffees, counter);
              vector::push_back(&mut all_coffees, *coffee_ref);
          };
          counter = counter + 1;
      };
      all_coffees
  }


  ////////////////////////////////////////////////////////// TEST ////////////////////////////////////////////////////////////////
  #[test(admin_global = @deployer_addr)]

  fun test_init(admin_global: &signer) {
      // let admin_addr = signer::address_of(&admin_global);
      // timestamp::set_time_has_started_for_testing(&aptos_framework);
      initialize(admin_global);
  }

  // #[test(admin_global = @deployer_addr, user1 = @0x123, user2 = @0x456, aptos_framework = @aptos_framework)]
  // fun test_buy_coffee(admin_global: &signer, user1: &signer, user2: &signer) acquires CoffeeList {
  //     let admin_addr = signer::address_of(admin_global);
  //     let user1_addr = signer::address_of(user1);
  //     let user2_addr = signer::address_of(user2);
  //     timestamp::set_time_has_started_for_testing(&aptos_framework);


  //     account::create_account_for_test(admin_addr);
  //     account::create_account_for_test(user1_addr);
  //     account::create_account_for_test(user2_addr);

  //     let (burn_cap, mint_cap) = aptos_framework::aptos_coin::initialize_for_test(&aptos_framework);
  //     coin::register<AptosCoin>(admin_global);
  //     coin::register<AptosCoin>(user1);
  //     coin::register<AptosCoin>(user2);

  //     let coins1 = coin::mint(100 * 100000000, &mint_cap);

  //     coin::deposit(admin_addr, coins1);
  //     coin::deposit(user1_addr, coins1);
  //     coin::deposit(user2_addr, coins1);

  //     let initial_balance1 = coin::balance<AptosCoin>(user1_addr);
  //     let initial_balance2 = coin::balance<AptosCoin>(user2_addr);
  //     let initial_balance3 = coin::balance<AptosCoin>(admin_addr);

  //     initialize(admin_global);
  //     buyCoffee(user1, string::utf8(b"User1"), string::utf8(b"I have sent 1 APT"), 1);
  //     buyCoffee(user2, string::utf8(b"User2"), string::utf8(b"I have sent 3 APT"), 3);

  //     coin::destroy_burn_cap(burn_cap);
  //     coin::destroy_mint_cap(mint_cap);
  // }
  
  // #[test(admin_global = @deployer_addr, user1 = @0x123, user2 = @0x456, aptos_framework = @aptos_framework)]
  // fun test_get_coffee_by_id(admin_global: &signer, user1: &signer, user2: &signer) acquires CoffeeList {
  //     // let admin_addr = signer::address_of(admin_global);
  //     let admin_addr = signer::address_of(admin_global);
  //     let user1_addr = signer::address_of(user1);
  //     let user2_addr = signer::address_of(user2);
  //     timestamp::set_time_has_started_for_testing(&aptos_framework);


  //     account::create_account_for_test(admin_addr);
  //     account::create_account_for_test(user1_addr);
  //     account::create_account_for_test(user2_addr);

  //     let (burn_cap, mint_cap) = aptos_framework::aptos_coin::initialize_for_test(&aptos_framework);
  //     coin::register<AptosCoin>(admin_global);
  //     coin::register<AptosCoin>(user1);
  //     coin::register<AptosCoin>(user2);

  //     let coins1 = coin::mint(100 * 100000000, &mint_cap);

  //     coin::deposit(admin_addr, coins1);
  //     coin::deposit(user1_addr, coins1);
  //     coin::deposit(user2_addr, coins1);

  //     let initial_balance1 = coin::balance<AptosCoin>(user1_addr);
  //     let initial_balance2 = coin::balance<AptosCoin>(user2_addr);
  //     let initial_balance3 = coin::balance<AptosCoin>(admin_addr);

  //     initialize(admin_global);
  //     buyCoffee(user1, string::utf8(b"User1"), string::utf8(b"I have sent 1 APT"), 1);
  //     buyCoffee(user2, string::utf8(b"User2"), string::utf8(b"I have sent 3 APT"), 3);

  //     let result = get_coffee_by_id(1);
  //     debug::print(&result);
  //     let result1 = get_coffee_by_id(0);
  //     debug::print(&result1);

  //     coin::destroy_burn_cap(burn_cap);
  //     coin::destroy_mint_cap(mint_cap);
  // }

  // #[test(admin_global = @deployer_addr, user1 = @0x123, user2 = @0x456, aptos_framework = @aptos_framework)]
  // fun test_get_coffee_by_address(admin_global: &signer, user1: &signer, user2: &signer) acquires CoffeeList {
  //     // let admin_addr = signer::address_of(admin_global);
  //     let admin_addr = signer::address_of(admin_global);
  //     let user1_addr = signer::address_of(user1);
  //     let user2_addr = signer::address_of(user2);
  //     timestamp::set_time_has_started_for_testing(&aptos_framework);


  //     account::create_account_for_test(admin_addr);
  //     account::create_account_for_test(user1_addr);
  //     account::create_account_for_test(user2_addr);

  //     let (burn_cap, mint_cap) = aptos_framework::aptos_coin::initialize_for_test(&aptos_framework);
  //     coin::register<AptosCoin>(admin_global);
  //     coin::register<AptosCoin>(user1);
  //     coin::register<AptosCoin>(user2);

  //     let coins1 = coin::mint(100 * 100000000, &mint_cap);

  //     coin::deposit(admin_addr, coins1);
  //     coin::deposit(user1_addr, coins1);
  //     coin::deposit(user2_addr, coins1);

  //     let initial_balance1 = coin::balance<AptosCoin>(user1_addr);
  //     let initial_balance2 = coin::balance<AptosCoin>(user2_addr);
  //     let initial_balance3 = coin::balance<AptosCoin>(admin_addr);

  //     initialize(admin_global);
  //     buyCoffee(user1, string::utf8(b"User1"), string::utf8(b"I have sent 1 APT"), 1);
  //     buyCoffee(user2, string::utf8(b"User2"), string::utf8(b"I have sent 3 APT"), 3);
  //     buyCoffee(user1, string::utf8(b"User1"), string::utf8(b"I have sent 2 APT"), 2);

  //     let result = get_coffee_by_address(signer::address_of(user1));
  //     debug::print(&string::utf8(b"This is get coffee by address"));
  //     debug::print(&result);

  //     coin::destroy_burn_cap(burn_cap);
  //     coin::destroy_mint_cap(mint_cap);
  // }

  // #[test(admin_global = @deployer_addr, user1 = @0x123, user2 = @0x456, aptos_framework = @aptos_framework)]
  // fun test_get_all_coffee(admin_global: &signer, user1: &signer, user2: &signer) acquires CoffeeList {
  //     // let admin_addr = signer::address_of(admin_global);
  //     let admin_addr = signer::address_of(admin_global);
  //     let user1_addr = signer::address_of(user1);
  //     let user2_addr = signer::address_of(user2);
  //     timestamp::set_time_has_started_for_testing(&aptos_framework);


  //     account::create_account_for_test(admin_addr);
  //     account::create_account_for_test(user1_addr);
  //     account::create_account_for_test(user2_addr);

  //     let (burn_cap, mint_cap) = aptos_framework::aptos_coin::initialize_for_test(&aptos_framework);
  //     coin::register<AptosCoin>(admin_global);
  //     coin::register<AptosCoin>(user1);
  //     coin::register<AptosCoin>(user2);

  //     let coins1 = coin::mint(100 * 100000000, &mint_cap);

  //     coin::deposit(admin_addr, coins1);
  //     coin::deposit(user1_addr, coins1);
  //     coin::deposit(user2_addr, coins1);

  //     let initial_balance1 = coin::balance<AptosCoin>(user1_addr);
  //     let initial_balance2 = coin::balance<AptosCoin>(user2_addr);
  //     let initial_balance3 = coin::balance<AptosCoin>(admin_addr);

  //     initialize(admin_global);
  //     buyCoffee(user1, string::utf8(b"User1"), string::utf8(b"I have sent 1 APT"), 1);
  //     buyCoffee(user2, string::utf8(b"User2"), string::utf8(b"I have sent 3 APT"), 3);
  //     buyCoffee(user1, string::utf8(b"User1"), string::utf8(b"I have sent 2 APT"), 2);
  //     buyCoffee(user2, string::utf8(b"User2"), string::utf8(b"I have sent 10 APT"), 10);

  //     let balance1 = coin::balance<AptosCoin>(user1_addr);
  //     let balance2 = coin::balance<AptosCoin>(user2_addr);
  //     let balance3 = coin::balance<AptosCoin>(admin_addr);

  //     let result = get_all_coffee();

  //     debug::print(&string::utf8(b"======================================="));
  //     debug::print(&string::utf8(b"BALANCE INITIALLY"));
  //     debug::print(&string::utf8(b"balance of user1"));
  //     debug::print(&initial_balance1);
  //     debug::print(&string::utf8(b"balance of user2"));
  //     debug::print(&initial_balance2);
  //     debug::print(&string::utf8(b"balance of admin"));
  //     debug::print(&initial_balance3);
  //     debug::print(&string::utf8(b"======================================="));
  //     debug::print(&string::utf8(b"======================================="));
  //     debug::print(&string::utf8(b"This is to get all coffee"));
  //     debug::print(&result);
  //     debug::print(&string::utf8(b"======================================="));

  //     debug::print(&string::utf8(b"======================================="));
  //     debug::print(&string::utf8(b"BALANCE AFTER"));
  //     debug::print(&string::utf8(b"balance of user1"));
  //     debug::print(&balance1);
  //     debug::print(&string::utf8(b"balance of user2"));
  //     debug::print(&balance2);
  //     debug::print(&string::utf8(b"balance of admin"));
  //     debug::print(&balance3);
  //     debug::print(&string::utf8(b"======================================="));

  //     coin::destroy_burn_cap(burn_cap);
  //     coin::destroy_mint_cap(mint_cap);
  // }


}