export default class Helpers {
    generateRandomString = (length: number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i <= length; i++) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
        return result;
    }

}