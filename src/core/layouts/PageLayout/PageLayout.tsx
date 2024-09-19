"use client"

import { Flex, Paper, Title } from "@mantine/core";
import React, { ReactNode } from "react";

type PageLayoutProps = {
    children: React.ReactNode;
    pageTitle?:string,
}
export function PageLayout({ children, pageTitle }: PageLayoutProps):ReactNode {
    return(
        <Flex direction='column' gap='md'>
            <Title>
                {pageTitle}
            </Title>

            <Paper withBorder p='md'>
                <Flex direction='column' gap='md'>
                    {children}
                </Flex>
            </Paper>
        </Flex>
    )
}