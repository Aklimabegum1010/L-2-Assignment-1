# TypeScript Assignment — Solutions & Blogs

এই রিপোজিটরিতে TypeScript-এর মৌলিক ও ইন্টারমিডিয়েট কনসেপ্ট নিয়ে তৈরি ৮টি প্রোগ্রামিং সমস্যার সমাধান এবং ২টি টেকনিক্যাল ব্লগ আছে। পুরো কোডটি এক ফাইলে লেখা — `solutions.ts` — এবং ব্লগ দুটি আলাদা Markdown ফাইলে।

## Assignment Overview

**Course:** Next Level Web Development (Backend) — Assignment B8-A1
**Topic:** TypeScript Fundamentals & OOP

এই অ্যাসাইনমেন্টে TypeScript-এর নিচের কনসেপ্টগুলো ব্যবহার করে ৮টি ফাংশন/ক্লাস লেখা হয়েছে:

| # | Problem | Concepts Used |
|---|---------|---------------|
| 1 | `multiplyValue` | Default parameters, return type |
| 2 | `processInput` | Union types, type narrowing (`typeof`) |
| 3 | `formatCoordinate` | Readonly tuple, destructuring |
| 4 | `concatenateArrays` | Generics, rest parameters |
| 5 | `getPopularCourses` | Interface, array `filter` |
| 6 | `pluckValues` | Generics, `keyof`, indexed access types |
| 7 | `Employee` / `Manager` | OOP, inheritance, `public`/`private`/`protected` |
| 8 | `validateAgeAsync` | `async/await`, `Promise`, error handling |

## Blogs

- [Blog 1: Type Alias বনাম Interface](./type-vs-interface.md)
- [Blog 2: Access Modifiers (public, private, protected, readonly)](./access-modifiers.md)

## ফাইল স্ট্রাকচার

```
B8-A1/
├── solutions.ts              # ৮টি সমস্যার সমাধান
├── type-vs-interface.md      # ব্লগ ১: Type Alias বনাম Interface
├── access-modifiers.md       # ব্লগ ২: Access Modifiers
└── README.md                 # এই ফাইল
```

---

## `solutions.ts` — কোডের বিস্তারিত ব্যাখ্যা

### Problem 1 — ডিফল্ট প্যারামিটারসহ গুণ

```ts
function multiplyValue(value: number, multiplier: number = 2): number {
  return value * multiplier;
}
```

- `multiplier`-এর ডিফল্ট মান `2`, তাই একটি আর্গুমেন্ট দিলে সংখ্যাটি নিজেই ২ দিয়ে গুণ হয়, দুটি দিলে দ্বিতীয়টি ব্যবহার হয়।
- রিটার্ন টাইপ স্পষ্টভাবে `number` ঘোষণা করা, ফলে TypeScript ভুল টাইপে কাজ করলে compile-time-এ ধরতে পারে।
- উদাহরণ: `multiplyValue(10)` → `20`, `multiplyValue(10, 5)` → `50`, `multiplyValue(7, 0)` → `0`।

### Problem 2 — Union টাইপ প্রসেসিং

```ts
function processInput(value: string | number | boolean): string | number {
  if (typeof value === "string") return value.trim().toLowerCase();
  else if (typeof value === "number") return value * 10;
  else return value ? "Active" : "Inactive";
}
```

- ইনপুট তিন ধরনের হতে পারে: `string | number | boolean`, রিটার্ন হয় `string | number`।
- `typeof` দিয়ে **type narrowing** করা হয়েছে, তাই প্রতিটি শাখায় TypeScript জানে `value` কী টাইপ।
- String → ট্রিম + lowercase; Number → ১০ গুণ; Boolean → `"Active"` / `"Inactive"`।
- উদাহরণ: `"  TypeScript  "` → `"typescript"`, `7` → `70`, `true` → `"Active"`, `false` → `"Inactive"`।

### Problem 3 — Readonly Tuple ডিস্ট্রাকচারিং

```ts
function formatCoordinate(
  coordinate: readonly [number, number, string]
): string {
  const [latitude, longitude, locationName] = coordinate;
  return `Location: ${locationName} (${latitude}, ${longitude})`;
}
```

- `readonly` tuple নিশ্চিত করে ফাংশনের ভিতরে অ্যারের মান পরিবর্তন করা যাবে না।
- Tuple-এর পজিশন অনুযায়ী টাইপ নির্দিষ্ট: প্রথম দুটি `number` (lat, long), তৃতীয়টি `string` (নাম)।
- ডিস্ট্রাকচারিং করে সরাসরি টেমপ্লেট লিটারালে বসানো হয়েছে।
- উদাহরণ: `[23.81, 90.41, "Dhaka"]` → `Location: Dhaka (23.81, 90.41)`।

### Problem 4 — Generic অ্যারে কনক্যাটেনেশন

```ts
function concatenateArrays<T>(...arrays: T[][]): T[] {
  const combinedArray: T[] = [];
  for (const array of arrays) combinedArray.push(...array);
  return combinedArray;
}
```

- **Rest parameter** `...arrays` দিয়ে যত খুশি অ্যারে পাঠানো যায়।
- `<T>` generic টাইপ ব্যবহার করায় যে-কোনো টাইপের (string, number, object) অ্যারে একসাথে জোড়া লাগে এবং টাইপ সুরক্ষা বজায় থাকে।
- `push(...array)` দিয়ে প্রতিটি অ্যারের উপাদান আলাদা করে যোগ করা হয়েছে।
- উদাহরণ: `concatenateArrays(["a", "b"], ["c", "d"])` → `["a", "b", "c", "d"]`।

### Problem 5 — Interface ও ফিল্টারিং

```ts
interface Course {
  title: string;
  students: number;
  isPublished: boolean;
}

function getPopularCourses(courses: Course[], minStudents: number): Course[] {
  return courses.filter(
    (course: Course) => course.isPublished === true && course.students >= minStudents
  );
}
```

- `Course` interface দিয়ে কোর্স অবজেক্টের আকৃতি (shape) সংজ্ঞায়িত করা হয়েছে।
- `filter` দিয়ে শুধু সেই কোর্সগুলো রাখা হয়েছে যেগুলো **published** এবং `minStudents`-এর সমান বা বেশি।
- ইনপুট ও আউটপুট দুটোই `Course[]`, তাই টাইপ-সেফ।
- নমুনা ডেটা: TypeScript Mastery (120), Basic HTML (45), Next.js Pro (85) — `minStudents = 80` দিলে Draft Course বাদ পড়ে।

### Problem 6 — Generic `keyof` দিয়ে নির্দিষ্ট প্রপার্টি তোলা

```ts
function pluckValues<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item: T): T[K] => item[key]);
}
```

- `K extends keyof T` নিশ্চিত করে `key` শুধু `T`-এর বৈধ প্রপার্টি হতে পারে — ভুল প্রপার্টি দিলে compile error।
- রিটার্ন টাইপ `T[K][]` — অর্থাৎ যে প্রপার্টি তোলা হচ্ছে তার টাইপের অ্যারে (indexed access type)।
- উদাহরণ: `pluckValues(users, "id")` → `[1, 2, 3]`, `pluckValues(users, "name")` → নামের অ্যারে।

### Problem 7 — OOP, Inheritance ও Access Modifiers

```ts
class Employee {
  constructor(protected name: string, private baseSalary: number) {}
  getDetails() {
    return `Employee: ${this.name}, Base Salary: ${this.baseSalary}`;
  }
}

class Manager extends Employee {
  constructor(name: string, baseSalary: number, private department: string) {
    super(name, baseSalary);
  }
  getRoleInfo() {
    return `Manager of ${this.department}: ${this.name}`;
  }
}
```

- `Employee` হলো বেস ক্লাস; `Manager` সেটিকে `extends` করে।
- `name` **protected** — subclass (Manager) অ্যাক্সেস করতে পারে।
- `baseSalary` **private** — শুধু `Employee`-এর ভিতরে ব্যবহারযোগ্য, বাইরে বা subclass-এ নয়।
- `department` Manager-এর নিজস্ব private প্রপার্টি।
- `super(name, baseSalary)` দিয়ে বেস ক্লাসের constructor কল করা হয়েছে — inheritance-এ এটি বাধ্যতামূলক।

### Problem 8 — Async/Await, Error Handling ও Promise

```ts
async function validateAgeAsync(age: number): Promise<string> {
  if (age < 18) throw new Error("Access Denied: Must be 18 or older");
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
  return "Access Granted";
}

const runValidation = async (): Promise<void> => {
  try {
    const result: string = await validateAgeAsync(20);
    console.log(result);
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
};

void runValidation();
```

- `async` ফাংশন সবসময় `Promise<string>` রিটার্ন করে।
- বয়স ১৮-এর কম হলে `throw` করা হয়, যা promise-কে reject করে।
- ১ সেকেন্ডের `setTimeout` কে Promise-এ মোড়ানো হয়েছে যাতে `await` দিয়ে অপেক্ষা করা যায়।
- `try/catch`-এ `error: unknown` ব্যবহার করে নিরাপদে `instanceof Error` চেক করা হয়েছে।
- `void runValidation()` দিয়ে ফাংশনটি কল করা হয়েছে যাতে "floating promise" warning না আসে।

---

## ব্লগ ১ — `blog1-type-interface.md`

**বিষয়:** TypeScript-এ Type Alias বনাম Interface — মূল পার্থক্য এবং কখন কোনটি ব্যবহার করবেন।

ব্লগে যা যা আলোচনা করা হয়েছে:

1. **ভূমিকা** — দুটোই অবজেক্টের আকৃতি বোঝাতে ব্যবহৃত হয়, সাধারণ ক্ষেত্রে প্রায় একই রকম, কিন্তু সক্ষমতা ও সম্প্রসারণে পার্থক্য আছে।
2. **Open vs Closed declaration** — `interface` একাধিকবার declare করে merge করা যায় (declaration merging), `type` alias একবারই declare করা যায়।
3. **Extends বনাম Intersection** — interface উত্তরাধিকারে `extends` ব্যবহার করে; type alias ইন্টারসেকশন `&` ব্যবহার করে।
4. **সীমাবদ্ধতা** — interface শুধু অবজেক্ট টাইপ বর্ণনা করতে পারে; type alias union, intersection, primitive, tuple, conditional — যেকোনো টাইপ প্রকাশ করতে পারে।
5. **কোড উদাহরণ** — `type Status = "success" | "error"` (union-এর জন্য type) এবং `interface User { id: string; name: string }` (অবজেক্টের জন্য interface)।
6. **কখন কোনটি** — অবজেক্ট/ক্লাসের contract এবং লাইব্রেরি পাবলিক API-তে interface; union, mapped, conditional টাইপে type alias।

## ব্লগ ২ — `blog-2-access-modifiers.md`

**বিষয়:** TypeScript OOP-তে Access Modifiers — `public`, `private`, `protected`, `readonly`।

ব্লগে যা যা আলোচনা করা হয়েছে:

1. **ভূমিকা** — access modifier ঠিক করে class member কোথায় ব্যবহার করা যাবে; এগুলো encapsulation বাড়ায় এবং compile-time-এ ভুল ধরতে সাহায্য করে।
2. **`public`** — ডিফল্ট, সব জায়গা থেকে accessible।
3. **`private`** — শুধু declaring class-এর ভিতরে accessible।
4. **`protected`** — class এবং subclass উভয়েই accessible।
5. **`readonly`** — এটি আসলে visibility modifier নয়, বরং mutation modifier; initialization-এর পর মান আর বদলানো যায় না এবং অন্য modifier-এর সাথে ব্যবহার করা যায়।
6. **কোড উদাহরণ** — `Account` ক্লাসে চারটি modifier একসাথে দেখানো হয়েছে, এবং `SavingsAccount extends Account`-এ দেখানো হয়েছে `protected bankCode` কাজ করে কিন্তু `private balance` অ্যাক্সেস করলে error হয়।

---

## কীভাবে চালাবেন

`tsc` বা `ts-node` ইনস্টল থাকলে:

```bash
npx ts-node solutions.ts
```

> নোট: `solutions.ts`-এ বেশিরভাগ `console.log` কমেন্ট করা আছে; পরীক্ষা করার সময় কমেন্ট খুলে নিলেই আউটপুট দেখা যাবে।
