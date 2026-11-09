// problem-1

function multiplyValue(value: number, multiplier: number = 2) : number{
return value * multiplier
}
// console.log(multiplyValue(10))
// console.log(multiplyValue(10, 5))
// console.log(multiplyValue(7, 0))



// problem-2

function processInput (value: string | number | boolean) : string | number {
    if(typeof value === "string") {
        return value.trim().toLowerCase()
    }
    else if (typeof value === "number") {
        return value * 10
    }
    else {
        return value ? "Active" :"Inactive"
    }
}

// console.log(processInput("  TypeScript  "))
// console.log((processInput(7)))
// console.log(processInput(true))
// console.log(processInput(false))

// problem-3


function formatCoordinate ( coordinate : readonly [number, number, string]) : string {
    const  [latitude, longitude, locationName] = coordinate
    return `Location: ${locationName} (${latitude}, ${longitude})`
}
//
// console.log (formatCoordinate([23.81, 90.41, "Dhaka"]))
// console.log  (formatCoordinate([22.35, 91.78, "Chittagong"]))

// problem-4
function concatenateArrays<T>(...arrays: T[][]): T[] {
const combinedArray: T[] = [];
for ( const array of arrays ){
combinedArray.push(...array)
}
return combinedArray
}

// console.log(concatenateArrays(["a", "b"], ["c", "d"]))

// problem-5
interface Course {
    title :string;
    students : number;
    isPublished : boolean
}

function getPopularCourses ( courses: Course[], minStudents: number) : Course[] {
    return courses.filter((course : Course )=>
        course.isPublished === true && course.students >= minStudents
    )
}
const courses = [
    { title: "TypeScript Mastery", students: 120, isPublished: true },
    { title: "Draft Course", students: 200, isPublished: false },
    { title: "Basic HTML", students: 45, isPublished: true },
    { title: "Next.js Pro", students: 85, isPublished: true }
];
// console.log(getPopularCourses(courses, 80))

// problem-6

function pluckValues <T, K extends keyof T>(items: T[], key: K ): T[K][]  {
    return items.map((item: T): T[K] => item[key])
}
const users = [
    { id: 1, name: "Rakib", role: "Admin" },
    { id: 2, name: "Sadia", role: "Editor" },
    { id: 3, name: "Tariq", role: "Subscriber" }
];

// console.log(pluckValues(users, "id"))



class Employee {
    constructor(protected name: string,  private baseSalary: number ) {
    }
    getDetails(){
        return `Employee: ${this.name}, Base Salary: ${this.baseSalary}`
    }
}

class Manager extends Employee{
constructor(name: string, baseSalary: number, private department: string ) {
    super(name, baseSalary);
}
    getRoleInfo(){
    return `Manager of ${this.department}: ${this.name}`
    }
}

const manager = new Manager("Alice", 50000, "Engineering");
// console.log(manager.getDetails())
manager.getRoleInfo();


// pblm-8
async function validateAgeAsync (age: number) : Promise<string> {
    if ( age < 18) {
        throw new Error("Access Denied: Must be 18 or older")
    }
    await new Promise<void>( resolve => {
        setTimeout( ()=> {resolve()},1000)
    })
    return "Access Granted"
}


const runValidation = async (): Promise<void> => {
    try {
        const result: string = await validateAgeAsync(20);
        console.log(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};

void runValidation();