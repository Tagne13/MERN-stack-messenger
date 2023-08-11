import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast, Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { useDisclosure } from '@chakra-ui/hooks';
import { FormControl } from '@chakra-ui/form-control';
import axios from 'axios';
import React, { useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import UserBadgeItem from '../userAvatar/UserBadgeItem';
import UserListItem from '../userAvatar/UserListItem';

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { user, chats, setChats } = ChatState();

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: 'User already added',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Error Occurred',
                description: 'Failed to load the search results',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            });
        }
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: 'Please fill out all fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const { data } = await axios.post(
                `/api/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
            );
            setChats([data, ...chats]);
            onClose();
            toast({
                title: 'New Group Chat Created',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        } catch (error) {
            toast({
                title: 'Failed to create chat',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    };

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize='35px'
                        fontFamily='Roboto'
                        d='flex'
                        justifyContent='center'
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d='flex' flexDir='column' alignItems='center'>
                        <FormControl>
                            <Input
                                placeholder='Chat Name'
                                mb={1}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder='Add Users eg: John, Jane, Jeff'
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <Box w='100%' d='flex' flexWrap='wrap'>
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult
                                ?.slice(0, 4)
                                .map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme='teal'>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GroupChatModal;