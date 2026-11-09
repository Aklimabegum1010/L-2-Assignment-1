# TypeScript OOP-তে Access Modifiers: public, private, protected, readonly

## ভূমিকা

TypeScript-এ access modifier ঠিক করে একটি class member কোডের কোন কোন জায়গা থেকে ব্যবহার করা যাবে। এগুলো encapsulation বজায় রাখে, অপ্রয়োজনীয় ডেটা বাইরে থেকে পরিবর্তন হওয়া রোধ করে এবং compile time-এ ভুল ধরতে সাহায্য করে। এই পোস্টে চারটি modifier উদাহরণসহ ব্যাখ্যা করা হয়েছে।

## প্রতিটি Modifier-এর কাজ

`public` হলো ডিফল্ট। কোনো modifier না লিখলেও member public থাকে এবং সব জায়গা থেকে accessible।

`private` member শুধু যে class-এ declare করা হয়েছে তার ভিতরেই ব্যবহার করা যায়। Subclass বা class-এর বাইরে থেকে এটি পড়া বা বদলানো যাবে না।

`protected` member declaring class এবং তার subclass-এ accessible, কিন্তু class-এর বাইরের কোড থেকে নয়। Inheritance-এ সাধারণ state শেয়ার করতে এটি কাজে লাগে।

`readonly` আসলে visibility modifier নয়—এটি mutation modifier। Constructor-এ একবার মান বসানোর পর আর reassignment করা যায় না। এটি public, private বা protected-এর সাথে একসাথে ব্যবহার করা যায়।

```ts
class Account {
  public owner: string;
  private balance: number;
  protected bankCode: string;
  readonly id: string;

  constructor(owner: string, balance: number, bankCode: string, id: string) {
    this.owner = owner;
    this.balance = balance;
    this.bankCode = bankCode;
    this.id = id;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }
}

class SavingsAccount extends Account {
  showBankCode(): string {
    return this.bankCode; // OK: protected
    // return this.balance; // Error: private
  }
}
```

উপরের উদাহরণে `SavingsAccount` তার parent-এর `bankCode` পড়তে পারে, কারণ এটি protected। কিন্তু `balance` private হওয়ায় subclass থেকেও সরাসরি অ্যাক্সেস করা যায় না; কেবল `deposit`-এর মতো method-এর মাধ্যমে তা পরিবর্তন করা যায়।

## উপসংহার

public সব জায়গায় খোলা, private শুধু নিজের class-এ সীমাবদ্ধ, protected নিজের class ও subclass-এ সীমাবদ্ধ, আর readonly মান পরিবর্তন রোধ করে। সঠিক modifier ব্যবহার করলে class-এর internal state সুরক্ষিত থাকে এবং কোডের intent স্পষ্ট হয়।
