export default function ({parameters, next}) {
    const abilities = localStorage.getItem('abilities')
    const neededAbilities = parameters.split(',')
    if (!abilities) {
        throw new Error('Unauthorized.')
    }
    neededAbilities.forEach(neededAbility => {
        if (!abilities.includes(neededAbility)) {
            throw new Error('Unauthorized.')
        }
    })
    next()
}