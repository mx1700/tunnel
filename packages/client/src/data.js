export const LogData = {
    domain: 'http://localhost:8080',
    method: 'GET',
    path: '/blocks/xxxxxxxxxxxxxxxx',
    duration: 100,
    time: 1631881712,
    request: {
        query: "a=1&b=2&c=3",
        headers:{
            "x-header": "111"
        },
        body: {
            a: 1,
            b: "2",
            c: [1,2,3],
            d: {
                e: 999
            }
        }
    },
    response: {
        headers:{

        },
        body: {
            code: 200,
            message: "OK",
            data: {}
        }
    }
}
