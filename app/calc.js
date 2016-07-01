module.exports.sum = sum;

function sum(array) {
    return array.reduce((acc, t) => acc + t, 0);
}
