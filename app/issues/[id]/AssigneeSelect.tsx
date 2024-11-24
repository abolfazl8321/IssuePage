'use client';
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <Select.Root>
        <Select.Trigger aria-placegolder="Assign..."/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value='1'>Abolfazl Asgari</Select.Item>
                </Select.Group>
            </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
