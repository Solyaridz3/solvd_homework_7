const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
const promise4 = new Promise((resolve) => {
    setTimeout(resolve, 1000, "Promise 4");
});

// const promise5 = new Promise((_, reject) => {
//     setTimeout(reject, 2000, new Error("Promise 5 error"));
// });

function promiseAll(promises) {
    return new Promise((resolve) => {
        const results = [];
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((result) => {
                // if error it rejects it without explicit rejection
                results[index] = result;
                if (results.length === promises.length) {
                    resolve(results);
                }
            });
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
