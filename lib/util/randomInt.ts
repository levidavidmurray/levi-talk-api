export function randomInt(length: number): number {
    let lengthMultiplier = '1';
    for (let i = 0; i < length; i++) {
        lengthMultiplier += '0';
    }

    return Math.floor(Math.random() * parseInt(lengthMultiplier, 10));
}
