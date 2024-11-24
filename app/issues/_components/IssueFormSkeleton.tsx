import { Box } from '@radix-ui/themes';
import {Skeleton} from '@/app/components';
import React from 'react';

const IssueFormSkeleton = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height='2rem'/>
      <Skeleton height='20rem'/>
    </Box>
  )
}

export default IssueFormSkeleton