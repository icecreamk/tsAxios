function greeter1(name) {
    return "hello," + name.firstName + " " + name.lastName;
}
var b = { firstName: 'll', lastName: 'kk' };
console.log(greeter1(b));
// ===============================
function greeter(name) {
    return "hello," + name;
}
var a = 'kk';
console.log(greeter(a));
// ===============================
var Test = /** @class */ (function () {
    function Test(title, desc) {
        this.title = title;
        this.desc = desc;
        this.con = title + " " + desc;
    }
    return Test;
}());
console.log(new Test('11', '22'));
