import { makeHttpReq } from "@/helper/makeHttpReq";
import { showError } from "@/util/toast-notification";

export async function addPaymentMethod({ userId, email }: { userId: string, email: string }) {

    try {

        const data = await makeHttpReq('POST', `create-setup-session`, { userId, email }) as { url: string }
        window.open(data?.url)

    } catch (error) {
        console.log('error :', error?.message)

    }
}



export async function buyCredit({ userId, email, amount }: { userId: string, email: string, amount: number }) {

    try {

        const data = await makeHttpReq('POST', `charge-customer`, { userId, email, amount }) as { message: string }
        return data
    } catch (error) {
        showError(error?.message)

    }
}


export const getUserCreditAndPaymentMethod = async (userId: string) => {
    try {

        const data = await makeHttpReq('GET', `user-credits?userId=${userId}`)
        return data
    } catch (error) {
        showError(error?.error?.message)
    }

};
