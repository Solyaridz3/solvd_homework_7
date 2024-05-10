const promises = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3),
    new Promise((_, reject) => {
        setTimeout(reject, 1000, new Error("Error 2 occured"));
    }),
];

promiseAllSettled(promises).then((results) => {
    console.log("All promises settled:", results);
});

/**
 * Executes an array of promises concurrently and returns a promise that resolves to an array of results, 
 * regardless of whether they fulfill or reject.
 *
 * @param {Array<Promise>} promises - An array of promises to be executed concurrently.
 * @return {Promise<Array<{status: string, value: any}>>} A promise that resolves to an array of results, 
 * where each result has a "status" property indicating whether the promise fulfilled or rejected, and a 
 * "value" property containing the result or error message.
 */
function promiseAllSettled(promises) {
    return new Promise((resolve) => {
        const results = [];
        for (const [index, promise] of promises.entries()) {
            promise
                .then((result) => {
                    results[index] = { status: "fulfilled", value: result };
                })
                .catch((err) => {
                    results[index] = {
                        status: "rejected",
                        value: err.message || err,
                    };
                })
                .finally(() => {
                    if (results.length === promises.length) {
                        resolve(results);
                    }
                });
        }
    });
}
