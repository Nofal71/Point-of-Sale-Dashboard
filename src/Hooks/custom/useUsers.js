import { useEffect, useState, useCallback } from "react";
import { makeRequest } from "../../Server/api/instance";
import { useCommon } from "../common/useCommon";

export const useUsers = () => {
    const { setAlert, setConfirm, setLoader } = useCommon()
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
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
            if (searchInput) setSearchInput('')
            return true
        } catch (error) {
            console.log(error, "error in loading users");
        }
    };

    const updateFilteredUsers = useCallback((name) => {
        let updatedUsers = [...userList];
        if (name) {
            const nameData = updatedUsers?.find(e => e.name === name);
            console.log(nameData, 'name')
            setFilteredUsers([nameData]);
        } else {
            if (filter === "Blocked Users") {
                updatedUsers = updatedUsers.filter(user => user.status === "blocked");
            } else if (filter === "Admin") {
                updatedUsers = updatedUsers.filter(user => user.role === "admin");
            }
            setFilteredUsers(updatedUsers);
        }
    }, [userList, filter]);

    const handleFilter = (e) => {
        setFilter(e.target.value);
    };

    const updateSearchList = useCallback(async () => {
        try {
            const users = await makeRequest('GET', '/user')
            const nameData = users?.filter((e) => e.name.toLowerCase().includes(searchInput.toLowerCase()) || e.name.toLowerCase() === searchInput.toLowerCase());
            setSearchList(nameData);
        } catch (error) {
            console.log('error in search', error)
        } finally {
            setSearchProgress(false)
        }
    }, [searchInput]);

    const handleSearchNavigate = (name) => {
        updateFilteredUsers(name)
    }

    const handleSearch = (e) => {
        const value = e.target.value
        if (value === '') updateFilteredUsers()
        setSearchProgress(true)
        setTimeout(() => {
            setSearchInput(value);
        }, 800)
        clearTimeout()
    };


    useEffect(() => {
        setLoader(true)
        const loaded = loadUsers();
        loaded.then(res => res && setLoader(false))
    }, []);

    useEffect(() => {
        updateSearchList()
    }, [searchInput])

    useEffect(() => {
        updateFilteredUsers();
    }, [userList, filter, updateFilteredUsers]);

    return {
        userList: filteredUsers,
        filter,
        searchProgress,
        searchList,
        handleSearchNavigate,
        handleSearch,
        handleFilter,
        handleDeleteUser,
        setStatus,
        setRole,
    };
};
