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
    return courses.filter((course : Course ): boolean =>
        course.isPublished === true && course.students >= minStudents
    )
}





function pluckValues <T, K extends keyof T>(items: T[], key: K ): T[K][]  {
    return items.map((item: T): T[K] => item[key])
}






class Employee {
    constructor(
        protected name: string,
        private baseSalary: number
    ) {}

    getDetails(): string{
        return `Employee: ${this.name}, Base Salary: ${this.baseSalary}`
    }
}

class Manager extends Employee{
constructor(
    name: string,
    baseSalary: number,
    private department: string ) {
    super(name, baseSalary);
}
    getRoleInfo(): string{
    return `Manager of ${this.department}: ${this.name}`
    }
}


const validateAgeAsync = async (age: number): Promise<string> => {
    if (age < 18) {
        throw new Error("Access Denied: Must be 18 or older");
    }
    await new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
    return "Access Granted";

};



