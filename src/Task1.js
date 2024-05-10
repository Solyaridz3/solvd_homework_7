const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
];
const promise4 = new Promise((resolve) => {
    setTimeout(resolve, 1000, "Promise 4");
});


/**
 * Executes an array of promises concurrently and returns a promise that resolves to an array of results.
 *
 * @param {Array<Promise>} promises - An array of promises to be executed concurrently.
 * @return {Promise<Array>} A promise that resolves to an array of results, in the same order as the input promises.
 */
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((result) => {
                    results[index] = result;
                    if (results.length === promises.length) {
                        resolve(results);
                    }
                }).catch(reject);
        });
    });
}



/** Async realization, I mean anyway it returns promise */
// async function promiseAll(promises) {
//     const results = []
//     for (const [index, result] of promises.entries()) {
//         results[index] = await result;
//     }
//     return results;
// }

promiseAll([...promises, promise4])
    .then((results) => {
        console.log("All promises resolved:", results);
    })
    .catch((error) => {
        console.error("At least one promise rejected:", error);
    });
