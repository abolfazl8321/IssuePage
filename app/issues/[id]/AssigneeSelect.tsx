'use client';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Skeleton} from '@/app/components';

const AssigneeSelect = () => {
    const {data:users,error,isLoading}=useQuery<User[]>({
        queryKey:['users'],
        queryFn:()=>axios.get('/api/users').then(res=>res.data),
        staleTime:60*1000,
        retry:3 //60s
        
    });
    if(isLoading) return <Skeleton/>
        
    if(error) return null;
    useEffect(()=>{
        const fetchUsers=async()=>{
        const {data}=await axios.get<User[]>('/api/users');
        }
        fetchUsers();
    },[]);
  return (
    <Select.Root>
        <Select.Trigger aria-placegolder="Assign..."/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map(user=>(<Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>))}
                </Select.Group>
            </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
