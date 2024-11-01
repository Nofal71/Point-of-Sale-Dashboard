import { useEffect, useState, useCallback } from "react";
import { makeRequest } from "../../Server/api/instance";
import { useCommon } from "../common/useCommon";

export const useUsers = () => {
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const { setAlert, setConfirm, setLoader } = useCommon()
    const [searchProgress, setSearchProgress] = useState(false)

    const handleDeleteUser = (userId) => {
        const process = async () => {
            try {
                await makeRequest('DELETE', `/user/${userId}`)
                setAlert(`User Succesfully Deleted`, 'info')
                loadUsers()
            } catch (error) {
                console.log(error, 'Error in Deleting user')
            }
        }

        setConfirm('Are You Sure to Delete this User', process)
    }

    const setStatus = async (status, userId) => {
        try {
            await makeRequest('PATCH', `/user/${userId}`, { status })
            loadUsers()
            setAlert(`User Succesfully ${status}`, 'info')
        } catch (error) {
            console.log(error, 'Error in Changing status of user')
        }
    }


    const setRole = async (role, userId) => {
        try {
            await makeRequest('PATCH', `/user/${userId}`, { role })
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
        setSearchProgress(false)
        setFilteredUsers(updatedUsers);
    }, [userList, filter, searchInput]);

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchProgress(true)
        setTimeout(() => {
            setSearchInput(value);
        }, 800)
        clearTimeout()
    };

    const handleFilter = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        setLoader(true)
        const loaded = loadUsers();
        loaded.then(res => res && setLoader(false))
    }, []);

    useEffect(() => {
        updateFilteredUsers();
    }, [userList, filter, searchInput, updateFilteredUsers]);

    return {
        userList: filteredUsers,
        filter,
        searchInput,
        searchProgress,
        handleSearch,
        handleFilter,
        handleDeleteUser,
        setStatus,
        setRole,
    };
};
