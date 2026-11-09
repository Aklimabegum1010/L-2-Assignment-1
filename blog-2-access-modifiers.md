# TypeScript OOP-তে Access Modifiers: public, private, protected, readonly

## ভূমিকা

TypeScript access modifier নির্ধারণ করে class member কোথায় ব্যবহার করা যাবে। `public`, `private`, `protected` visibility নিয়ন্ত্রণ করে; `readonly` initialization-এর পর reassignment বন্ধ করে। এগুলো encapsulation বাড়ায় এবং compile time-এ ভুল ধরতে সাহায্য করে।

## বিস্তারিত আলোচনা

`public` ডিফল্ট: সব জায়গায় accessible। `private` শুধু declaring class-এর ভিতরে accessible। `protected` class এবং subclass-এ accessible। `readonly` আসলে access modifier নয়—এটি mutation modifier—এবং visibility modifier-এর সাথে ব্যবহার করা যায়।

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

  deposit(amount: number) {
    this.balance += amount; // OK
  }
}

class SavingsAccount extends Account {
  showBank() {
    console.log(this.bankCode); // OK: protected
    // console.log(this.balance); // Error: private
  }
}