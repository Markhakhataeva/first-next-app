"use client"

import React from "react";
import { MantineProvider } from "@mantine/core";
import { AppLayout } from "@/core/layouts/AppLayout/AppLayout";
import { ModalsProvider } from "@mantine/modals";
import { theme } from "@/shared/constants";

type ClientProviderTypes = {
    children?: React.ReactNode;
}

export function ClientProvider ({ children }:ClientProviderTypes) {
    return(
        <MantineProvider defaultColorScheme='light' theme={theme}>
            <ModalsProvider >
                <AppLayout>{children}</AppLayout>
            </ModalsProvider>
        </MantineProvider>
    )
}