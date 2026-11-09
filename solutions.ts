

function multiplyValue(value: number, multiplier: number = 2) : number{
return value * multiplier
}






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




function formatCoordinate ( coordinate : readonly [number, number, string]) : string {
    const  [latitude, longitude, locationName] = coordinate
    return `Location: ${locationName} (${latitude}, ${longitude})`
}




function concatenateArrays<T>(...arrays: T[][]): T[] {
const combinedArray: T[] = [];
for ( const array of arrays ){
combinedArray.push(...array)
}
return combinedArray
}

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




function pluckValues <T, K extends keyof T>(items: T[], key: K ): T[K][]  {
    return items.map((item: T): T[K] => item[key])
}
const users = [
    { id: 1, name: "Rakib", role: "Admin" },
    { id: 2, name: "Sadia", role: "Editor" },
    { id: 3, name: "Tariq", role: "Subscriber" }
];





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
    getRoleInfo(): string{
    return `Manager of ${this.department}: ${this.name}`
    }
}

const manager = new Manager("Alice", 50000, "Engineering");





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