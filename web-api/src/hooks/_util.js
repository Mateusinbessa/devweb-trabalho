import { APP_KEY } from "src/config"

const useUtil = () => {

    const getUser = () => {
        const user = JSON.parse(localStorage.getItem(APP_KEY))
        if (!user) return null
        else return user
    }
    const maskNumber = (e) => {
        let inputValue = e.target.value
        inputValue = inputValue.replace(/\D/g, '')

        let integerPart = inputValue.slice(0, -2)
        let decimalPart = inputValue.slice(-2)

        integerPart = integerPart.replace(/(?<=\d)(?=(\d{3})+(?!\d))/g, '.')

        if (integerPart.length > 0) {
            e.target.value = integerPart + ',' + decimalPart
        }
    }
    const maskInteger = (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, '')
        inputValue = inputValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        e.target.value = inputValue;
    }

    return {
        getUser,
        maskNumber,
        maskInteger
    }
}

export default useUtil
export { useUtil }