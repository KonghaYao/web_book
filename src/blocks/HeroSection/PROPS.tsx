import { AiFillAccountBook, AiFillStar, AiOutlineRight } from "solid-icons/ai";
import type { Component } from "solid-js";
import hero from "../../assets/alexandr-marynkin-oJ9CgpidOco-unsplash.jpg?url";
import background from "../../assets/kevin-wang-LqvskIMsv3I-unsplash.jpg?url";
export interface CommonProps {
    title: string;
    description: string;
    comps: {
        alert: Component;
        links: { href: string; comp: Component }[];
        btn: {
            href: string;
            label: string;
            icon?: Component;
            isPrimary?: boolean;
        }[];
        heroImage?: Component;
        form?: Component;
    };
    labelOfFeature?: string;
    backgroundImage?: string;
}

const commonProps = {
    title: "Investing in Global Potential",
    description: `At our firm, we concentrate on sectors where technological advancements, innovation, and strategic investment can create sustainable value and foster economic progress.`,
    labelOfFeature: "Featured In".toUpperCase(),
    comps: {
        alert: () => {
            return (
                <a
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
            );
        },
        links: ["google", "bing", "deno", "github", "solidjs"].map((i) => {
            return {
                href: "#",
                comp() {
                    return (
                        <img
                            src={`https://cdn.brandfetch.io/${i}.com`}
                            height={48}
                            width={48}
                            alt={i + " logo"}></img>
                    );
                },
            };
        }),
        btn: [
            // 根据示例写配置
            {
                href: "#",
                label: "Get started",
                icon: () => <AiFillAccountBook></AiFillAccountBook>,
                isPrimary: true,
            },
            {
                label: "Learn more",
                href: "#",
                isPrimary: false,
            },
        ],
        heroImage() {
            return <img src={hero} alt="mockup" />;
        },
    },
    backgroundImage: background,
};
export default commonProps;

export const twoColumns = {
    ...commonProps,
    // backgroundImage: "",
    comps: {
        ...commonProps.comps,
        links: [],
    },
};

export const CTAVideo: CommonProps = {
    ...commonProps,
    backgroundImage: "",
    labelOfFeature: "",
    comps: {
        ...commonProps.comps,
        btn: [],
        form() {
            return (
                <>
                    <form class="space-y-4 ">
                        <div class="flex gap-4">
                            <input
                                name="email"
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                                class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <button
                                type="submit"
                                class="bg-blue-500 px-12 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 flex-none">
                                Sign up
                                <AiOutlineRight class="inline-block"></AiOutlineRight>
                            </button>
                        </div>

                        <div class="mt-6 space-x-2">
                            <span class="text-gray-500">
                                <span class="text-gray-700 pr-2">
                                    <AiFillStar class="inline-flex -translate-y-px mr-1"></AiFillStar>
                                    1,456+
                                </span>
                                Reviews
                            </span>
                            <span class="text-gray-200">|</span>
                            <span class="text-gray-500">
                                No Credit Card Required
                            </span>
                        </div>
                    </form>
                </>
            );
        },

        heroImage() {
            return (
                <iframe
                    class="w-full select-none"
                    src="//player.bilibili.com/player.html?isOutside=true&aid=899591150&bvid=BV1EN4y1V7MB&cid=805303041&p=1&autoplay=false"
                    scrolling="no"
                    border="0"
                    frameborder="no"
                    framespacing="0"
                    allowfullscreen="false"></iframe>
            );
        },
    },
};
