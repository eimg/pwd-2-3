let i: number;
i = 123;

function add(a: number, b: number) {
    return a + b;
}

i = add(1, 2);

interface User {
    name: string;
    age: number;
    bio?: string;
}

type Student = {
    name: string;
    age: number;
    grade?: "A" | "B";
}

let alice: User =  {
    name: "Alice",
    age: 22,
}

let bob: Student & { gender: string } = {
    name: "Bob",
    age: 23,
    grade: "A",
    gender: "Male",
}

function wrap<T>(value: T) {
    return [value];
}

wrap(123);
wrap("abc");
wrap<{ name: string }>({ name: "Eve" });
