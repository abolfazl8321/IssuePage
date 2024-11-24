'use client'
import React from 'react';
import Link from 'next/link';
import { PiBugBeetleFill } from "react-icons/pi";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react'
import {Skeleton} from '@/app/components';

const NavBar = () => {
    
  return (
    <nav className='border-b mb-5 px-3 py-3'>
      <Container>
      <Flex justify='between'>
        <Flex align='center' gap='3'>
        <Link href="/"><PiBugBeetleFill/></Link>
        <NavLinks/>
        </Flex>
        <AuthStatus/>
      </Flex>
    </Container>
    </nav>
  )
}

const NavLinks=()=>{
  const currentPath=usePathname();
  
  const links=[
    {label:'Dashboard',href:"/"},
    {label:'Issues',href:"/issues/list"},
];
  return(
  <ul className='flex space-x-6'>
  {links.map(link=>
  <li key={link.href}>
  <Link 
      href={link.href}
      className={classnames({
          'text-zinc-900':link.href===currentPath,
          'text-zinc-500':link.href!==currentPath,
          'hover:text-zinc-800 transition-colors':true
         })}
      >{link.label}</Link>
      </li>
      )}  
</ul>
)
}

const AuthStatus=()=>{
  const {status,data:session}=useSession();

  if(status==="loading") return <Skeleton width='3rem'/>;

  if(status==='unauthenticated')
    return <Link href='/api/auth/signin'>Login</Link>;

  return(
  <Box>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar 
                src={session!.user!.image!} 
                fallback='?'
                 size='2' 
                 radius='full'
                 className='cursor-pointer'
                 referrerPolicy='no-referrer'
                 />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size='2'>
                      {session!.user!.email}
                  </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href='/api/auth/signout'>Log out</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
        )
}
export default NavBar;