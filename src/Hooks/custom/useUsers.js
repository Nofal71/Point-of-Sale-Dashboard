import { useEffect, useState, useCallback } from "react";
import { makeRequest } from "../../Server/api/instance";
import { useCommon } from "../common/useCommon";

export const useUsers = () => {
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const { setAlert, setConfirm, setLoader } = useCommon()

    const handleDeleteUser = (userId) => {
        const process = async () => {
            try {
                await makeRequest('DELETE', `/user/${userId}`)
                setAlert(`User Succesfully Deleted`, 'info')
                loadUsers()
            } catch (error) {
                console.log(error, 'Error in Deleting user')
            } finally {
                setChildLoader(false)
            }
        }

        setConfirm('Are You Sure to Delete this User', process)
    }

    const setStatus = async (status, userId) => {
        try {
            await makeRequest('PATCH', `/user/${userId}`, { status })
            await makeRequest('GET', `/user/${userId}`)
            loadUsers()
            setAlert(`User Succesfully ${status}`, 'info')
        } catch (error) {
            console.log(error, 'Error in Changing status of user')
        }
    }


    const setRole = async (role, userId) => {
        try {
            await makeRequest('PATCH', `/user/${userId}`, { role })
            await makeRequest('GET', `/user/${userId}`)
            loadUsers()
        } catch (error) {
            console.log(error, 'Error in Changing role')
        }
    }


    const loadUsers = async () => {
        try {
            const users = await makeRequest("GET", "/user");
            setUserList(users);
            setFilteredUsers(users);
            return true
        } catch (error) {
            console.log(error, "error in loading users");
        }
    };

    const updateFilteredUsers = useCallback(() => {
        let updatedUsers = [...userList];
        console.log(searchInput)
        if (searchInput) {
            updatedUsers = updatedUsers.filter(user =>
                user.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        if (filter === "Blocked Users") {
            updatedUsers = updatedUsers.filter(user => user.status === "blocked");
        } else if (filter === "Admin") {
            updatedUsers = updatedUsers.filter(user => user.role === "admin");
        }

        setFilteredUsers(updatedUsers);
    }, [userList, filter, searchInput]);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const handleFilter = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        setLoader(true)
        const loaded = loadUsers();
        loaded.then(res => res && setLoader(false))
        console.log('rendered........................')
    }, []);

    useEffect(() => {
        updateFilteredUsers();
    }, [userList, filter, searchInput, updateFilteredUsers]);

    return {
        userList: filteredUsers,
        filter,
        searchInput,
        handleSearch,
        handleFilter,
        handleDeleteUser,
        setStatus,
        setRole,
    };
};
