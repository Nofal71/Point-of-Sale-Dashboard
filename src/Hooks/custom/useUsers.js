import { useEffect, useState, useCallback, useRef } from "react";
import { makeRequest } from "../../Server/api/instance";
import { useCommon } from "../common/useCommon";
import { retry } from "@reduxjs/toolkit/query";

export const useUsers = () => {
    const { setAlert, setConfirm, setLoader } = useCommon();
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchProgress, setSearchProgress] = useState(false);
    const searchTimeout = useRef();

    const clientSideUpdate = (option) => {
        switch (option.value) {

            case 'DELETE':
                setUserList(prev => prev.filter(user => user.id !== option.userId));
                setFilteredUsers(prev => prev.filter(user => user.id !== option.userId));
                setSearchResults(prev => prev.filter(user => user.id !== option.userId));
                break;

            case 'STATUS':
                setUserList(prev =>
                    prev.map(user => user.id === option.userId ? { ...user, status: option.status } : user)
                );
                setFilteredUsers(prev =>
                    prev.map(user => user.id === option.userId ? { ...user, status: option.status } : user)
                );
                setSearchResults(prev =>
                    prev.map(user => user.id === option.userId ? { ...user, status: option.status } : user)
                );
                break;

            case 'ROLE':
                setUserList(prev =>
                    prev.map(user => user.id === option.userId ? { ...user, role: option.role } : user)
                );
                setFilteredUsers(prev =>
                    prev.map(user => user.id === option.userId ? { ...user, role: option.role } : user)
                );
                setSearchResults(prev =>
                    prev.map(user => user.id === option.userId ? { ...user, role: option.role } : user)
                );
                break;

            case 'RESTORE':
                setUserList([...option.reset])
                setFilteredUsers([...option.reset])
                setSearchResults([...option.reset])
                setFilter('')
                break;

        }
    };

    const setStatus = async (status, userId) => {
        const orignalList = [...userList]
        try {
            clientSideUpdate({ value: 'STATUS', userId, status });
            setAlert(`User Successfully ${status}`, 'info');
            await makeRequest('PATCH', `/user/${userId}`, { status });
        } catch (error) {
            clientSideUpdate({ value: 'RESTORE', reset: orignalList });
            setAlert('Network Error', 'error')
            console.log(error, 'Error in Changing status of user');
        }
    };

    const setRole = async (role, userId) => {
        const orignalList = [...userList]
        try {
            clientSideUpdate({ value: 'ROLE', userId, role });
            setAlert(`User Successfully Assigned to ${role}`, 'info');
            await makeRequest('PATCH', `/user/${userId}`, { role });
        } catch (error) {
            clientSideUpdate({ value: 'RESTORE', reset: orignalList });
            setAlert('Network Error', 'error')
            console.log(error, 'Error in Changing role');
        }
    };


    const handleDeleteUser = (userId) => {
        const orignalList = [...userList]
        const process = async () => {
            try {
                clientSideUpdate({ value: 'DELETE', userId })
                setAlert(`User Successfully Deleted`, 'info');
                await makeRequest('DELETE', `/user/${userId}`);
            } catch (error) {
                clientSideUpdate({ value: 'RESTORE', reset: orignalList });
                setAlert('Network Error', 'error')
                console.log(error, 'Error in Deleting user');
            }
        };
        setConfirm('Are You Sure to Delete this User', process);
    };

    const loadUsers = async () => {
        try {
            setLoader(true)
            const users = await makeRequest("GET", "/user");
            setUserList(users);
            setFilteredUsers(users);
            return true;
        } catch (error) {
            console.log(error, "error in loading users");
        } finally {
            setLoader(false)
        }
    };

    const updateFilteredUsers = useCallback(() => {
        let updatedUsers = [...userList];
        if (filter === "Blocked Users") {
            updatedUsers = updatedUsers.filter(user => user.status === "blocked");
        } else if (filter === "Admin") {
            updatedUsers = updatedUsers.filter(user => user.role === "admin");
        }
        setFilteredUsers(updatedUsers);
    }, [userList, filter]);

    const handleFilter = (e) => {
        setFilter(e.target.value);
    };

    const updateSearchList = useCallback(async () => {
        if (!searchInput) return;
        try {
            setSearchProgress(true);
            const users = await makeRequest('GET', '/user');
            const nameData = users.filter((e) => e.name.toLowerCase().includes(searchInput.toLowerCase()));
            setSearchResults(nameData);
        } catch (error) {
            console.log('error in search', error);
        } finally {
            setSearchProgress(false);
        }
    }, [searchInput]);


    const handleSearch = (e) => {
        const value = e.target.value;
        if (value === '') {
            setSearchResults([]);
            return;
        }
        setSearchProgress(true);
        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            setSearchInput(value);
        }, 500);
    };

    useEffect(() => {
        loadUsers()
    }, []);

    useEffect(() => {
        updateSearchList();
        setFilter('')
    }, [searchInput]);

    useEffect(() => {
        updateFilteredUsers();
    }, [userList, filter, updateFilteredUsers]);

    return {
        userList: (() => {
            if (searchResults.length > 0) {
                return searchResults;
            } else if (searchResults.length === 0 && searchInput.length > 0 && !searchProgress ) {
                setAlert('No User Found', 'info');
            } else {
                return filteredUsers;
            }
        })(),
        filter,
        searchProgress,
        searchResults,
        loadUsers,
        handleSearch,
        handleFilter,
        handleDeleteUser,
        setStatus,
        setRole,
    };

};
