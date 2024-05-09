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

function promiseAllSettled(promises) {
    return new Promise((resolve) => {
        const results = [];
        for (const [index, promise] of promises.entries()) {
            Promise.resolve(promise)
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
