import { useState } from "react"
import { makeRequest } from "../../Server/api/instance"
import { useEffect } from "react"

export const useOrders = () => {

    const [allOrders, setAllOrders] = useState()

    const getUserName = async (id) => {
        try {
            const user = await makeRequest('GET', `/user/${id}`)
            return user.name
        } catch (error) {
            console.error('Error in fetching user', error);
        }
    }

    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const res = await makeRequest('GET', '/orders')
                if (res) {
                    setAllOrders(res)
                }
            } catch (error) {
                console.error('Error in Getting Orders', error);
            }
        }
        getAllOrders()
    }, [])




    return { allOrders, getUserName }
}