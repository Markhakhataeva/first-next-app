import { FC } from "react";
import { IconHtml, IconBrandSass, IconBrandJavascript, IconBrandTypescript, IconBrandReact } from '@tabler/icons-react'

type categoriesType = {
    id:number,
    label:string,
    link:string,
    icon:FC
}

export const categories:categoriesType[] = [
    {
        id:1,
        label:"HTML(Теория)",
        link:"/html",
        icon:IconHtml
    },
    {
        id:2,
        label:"CSS(Теория)",
        link:"/css",
        icon:IconBrandSass
    },
    {
        id:3,
        label:"JavaScript(Теория)",
        link:"/java",
        icon:IconBrandJavascript
    },
    {
        id:4,
        label:"Typescript(Теория)",
        link:"/typescript",
        icon:IconBrandTypescript
    },
    {
        id:5,
        label:"React(Теория)",
        link:"/react",
        icon:IconBrandReact
    }
]