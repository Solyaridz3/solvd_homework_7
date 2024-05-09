//@ts-check
function asyncFunction1() {
    return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
    return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
    return Promise.resolve(data + " - Result from asyncFunction3");
}

function asyncFunction4(data) {
    return new Promise((resolve) =>
        setTimeout(resolve, 2000, data + " - Result from asyncFunction4")
    );
}

function asyncFunction5(data) {
    return new Promise((resolve) =>
        setTimeout(resolve, 2000, data + " - Result from asyncFunction5")
    );
}
const functionsArray = [
    asyncFunction1,
    asyncFunction2,
    asyncFunction3,
    asyncFunction4,
    asyncFunction5,
];

chainPromises(functionsArray)
    .then((result) => {
        console.log("Chained promise result:", result);
        // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
    })
    .catch((error) => {
        console.error("Chained promise error:", error);
    });

/**
 * Chains an array of promises together, executing them sequentially.
 *
 * @param {Array<(any)=>Promise<any>>} functionsArray - An array of functions that return promises.
 * @return {Promise} A promise that resolves to the final result of the chained promises.
 */
function chainPromises(functionsArray) {
    return functionsArray.reduce((prevPromise, currentFunction) => {
        return prevPromise.then(currentFunction);
    }, Promise.resolve());
}
