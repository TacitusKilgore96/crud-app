export async function fetchRandomDog() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    return response.json()
}

export async function fetchRandomAnimal() {
    const response = await fetch('https://random-animal-api.vercel.app/api/random-animal')
    return response.json()
}