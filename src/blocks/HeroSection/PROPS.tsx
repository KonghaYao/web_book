import { AiFillAccountBook } from "solid-icons/ai"
import type { Component } from "solid-js"

export interface CommonProps {
    title: string
    description: string
    comps: {
        alert: Component
        links: { href: string, comp: Component }[]
        btn: {
            href: string, label: string, icon?: Component, isPrimary?: boolean
        }[]
    }
    labelOfFeature?: string
}

export default {
    title: "Investing in Global Potential",
    description: `At our firm, we concentrate on sectors where technological advancements, innovation, and strategic investment can create sustainable value and foster economic progress.`,
    labelOfFeature: "Featured In".toUpperCase(),
    comps: {
        alert: () => {
            return <a
                href="#"
                class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                role="alert">
                <span class="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3 ">
                    New
                </span>
                <span class="text-sm font-medium">
                    SSR is out! See what's new
                </span>

            </a>
        },
        links: [
            'google',
            'bing',
            'deno',
            'github',
            'solidjs',
        ].map(i => {
            return {
                href: "#",
                comp() {
                    return <img src={`https://cdn.brandfetch.io/${i}.com`} height={48} width={48} alt={i + ' logo'}>
                    </img>
                },
            }
        }),
        btn: [
            // 根据示例写配置
            {
                href: "#",
                label: "Get started",
                icon: () => <AiFillAccountBook></AiFillAccountBook>,
                isPrimary: true
            },
            {
                label: "Learn more",
                href: "#",
                isPrimary: false
            }

        ]
    },
}