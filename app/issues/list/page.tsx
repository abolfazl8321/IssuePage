import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery,columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props { 
  searchParams: IssueQuery
}
const IssuesPage = async ({
  searchParams,
}: Props) => {
  
  const columnNames:{
    lable:string;
    value:keyof Issue;
    className?:string;
  }[]=[
    {lable:'Issues',value:'title'},
    {lable:'Status',value:'status',className:"hidden md:table-cell"},
    {lable:'Created',value:'createdAt',className:"hidden md:table-cell"}
  ]
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) 
    ? searchParams.status
    : undefined;
  const where={status}

  const orderBy=columnNames.map(column=>column.value).includes(searchParams.orderBy)
  ?{[searchParams.orderBy]:'asc'}
  :undefined

  const page=parseInt(searchParams.page) || 1;
  const pageSize=10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip:(page-1)*pageSize,
    take:pageSize
  });

  const IssueCount=await prisma.issue.count({where});

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={IssueCount}
      />
    </Flex>
  );
    };
export const dynamic = 'force-dynamic';

export const metadata:Metadata={
  title:'Issue Tracker - Issue List',
  description: 'View all project issues'
};

export default IssuesPage;