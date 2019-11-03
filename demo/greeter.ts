interface Person {
    firstName: string
    lastName: string
}

function greeter1(name: Person) {
    return `hello,${name.firstName} ${name.lastName}`
}

const b: Person = { firstName: 'll', lastName: 'kk' }
console.log(greeter1(b))

// ===============================

function greeter(name: string) {
    return `hello,${name}`
}
const a = 'kk'
console.log(greeter(a))

// ===============================
class Test {
    title: string
    desc: string
    con: string
    constructor(title:string, desc: string) {
        this.title = title
        this.desc = desc
        this.con = `${title} ${desc}`
    }
}

console.log(new Test('11', '22'))
