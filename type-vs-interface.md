# TypeScript-এ Type Alias বনাম Interface: কখন কোনটি ব্যবহার করবেন

## ভূমিকা

TypeScript-এ অবজেক্টের আকৃতি বোঝাতে `type` alias এবং `interface` — দুটোই ব্যবহৃত হয়। সাধারণ ক্ষেত্রে এরা প্রায় একই ফলাফল দেয়, তাই অনেকেরই ধারণা দুটো একই জিনিস। কিন্তু declaration, extension এবং কোন কোন টাইপ প্রকাশ করতে পারে—এই তিন জায়গায় এদের মধ্যে স্পষ্ট পার্থক্য আছে। এই পোস্টে উদাহরণসহ সেই পার্থক্যগুলো আলোচনা করা হয়েছে।

## মূল পার্থক্য

**১. Declaration merging:** `interface` একই নামে একাধিকবার declare করা যায় এবং TypeScript সেগুলো একত্রিত করে একটি সংজ্ঞা তৈরি করে। `type` alias একবারই declare করা যায়; আবার declare করলে duplicate identifier error হয়।

```ts
interface User {
  id: string;
}
interface User {
  name: string;
}
// User-এ এখন id এবং name দুটোই আছে

type Profile = { id: string };
// type Profile = { name: string }; // Error
```

**২. Extension:** interface উত্তরাধিকারে `extends` ব্যবহার করে, আর type alias ইন্টারসেকশন `&` ব্যবহার করে।

```ts
interface Admin extends User {
  role: "admin";
}

type AdminProfile = Profile & { role: "admin" };
```

**৩. সক্ষমতা:** interface শুধু অবজেক্ট বা ক্লাসের আকৃতি বর্ণনা করতে পারে। type alias যেকোনো টাইপ প্রকাশ করতে পারে—union, tuple, primitive, এমনকি conditional type।

```ts
type Status = "success" | "error" | "loading";
type Point = [number, number];
```

## কখন কোনটি বেছে নেবেন

- পাবলিক API, ক্লাসের contract, অথবা ভবিষ্যতে declaration merging/extension দরকার হলে `interface` ব্যবহার করুন।
- Union, tuple, mapped বা conditional টাইপের মতো জটিল টাইপে `type` alias ব্যবহার করুন, কারণ interface দিয়ে এগুলো লেখা সম্ভব নয়।

## উপসংহার

সংক্ষেপে, object shape-এর জন্য interface বেশি নমনীয় এবং library-র পাবলিক API-তে এটি সাধারণত পছন্দনীয়। আর union বা যেকোনো non-object type-এর জন্য type alias-ই একমাত্র সহজ সমাধান। দুটোর সীমাবদ্ধতা জানলে সঠিক জায়গায় সঠিকটি বেছে নেওয়া সহজ হয়।
