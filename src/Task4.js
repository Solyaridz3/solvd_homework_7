//@ts-check
function callbackStyleFunction(value, callback) {
    setTimeout(() => {
        if (value > 0) {
            callback(null, value * 2);
        } else {
            callback("Invalid value", null);
        }
    }, 1000);
}

/**
 * Promisifies a function.
 *
 * @param {function} fun - The function to promisify.
 * @return {function} A promisified version of the input function.
 */
function promisify(fun) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            };
            fun.call(this, ...args, callback);
        });
    };
}

const promisedFunction = promisify(callbackStyleFunction);

promisedFunction(3)
    .then((result) => {
        console.log("Promised function result:", result); // Expected: 6
    })
    .catch((error) => {
        console.error("Promised function error:", error);
    });
