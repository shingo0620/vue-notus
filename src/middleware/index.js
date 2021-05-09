export default async function ({from, to, next, router, middleware}) {
    const allMiddleware = Array.isArray(middleware) ? middleware : [middleware]
    try {
        const startIndex = 0
        const startMiddlewareName = allMiddleware[startIndex].split(':')[0]
        const parameters = allMiddleware[startIndex].split(':')[1]
        const startProcedure = (await import(`./${startMiddlewareName}`)).default
        return startProcedure({
            from,
            to,
            router,
            parameters,
            next: nextFactory({
                from,
                to,
                next,
                router,
                allMiddleware,
                nextIndex: startIndex + 1
            })
        })
    } catch (err) {
        // TODO: show error message
        console.error(err)
    }
}

const nextFactory = function ({from, to, router, next, allMiddleware, nextIndex}) {
    const nextMiddleware = allMiddleware[nextIndex]
    if (!nextMiddleware) {
        return next
    }
    return async function () {
        const nextProcessName = nextMiddleware.split(':')[0]
        const parameters = nextMiddleware.split(':')[1]
        const nextProcedure = (await import(`./${nextProcessName}`)).default
        nextProcedure({parameters, from, to, router, next: nextFactory({
                from,
                to,
                router,
                next,
                allMiddleware,
                nextIndex: nextIndex + 1
            })
        })
    }

}