import { Show } from "solid-js";
import type { CommonProps } from "./PROPS";

/**
 * @title Hero Section
 * @description Hero Section
 * @category Hero Section
 */
export default (props: CommonProps) => {
    return (
        <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                {props.comps.alert({})}
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    {props.title}
                </h1>
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    {props.description}
                </p>
                {/* BUTTON GROUP */}
                {!!props.comps.btn?.length && (
                    <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        {props.comps.btn.map((btn) => {
                            return (
                                <Show
                                    when={btn.isPrimary}
                                    fallback={
                                        <a
                                            href={btn.href}
                                            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 ring-0 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                            <span class={btn.icon && "mr-1"}>
                                                {btn.label}
                                            </span>
                                            {btn.icon?.({})}
                                        </a>
                                    }>
                                    <a
                                        href={btn.href}
                                        class="inline-flex  justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 ring-0 focus:ring-primary-300 dark:focus:ring-primary-900 transition-all">
                                        <span class={btn.icon && "mr-1"}>
                                            {btn.label}
                                        </span>
                                        {btn.icon?.({})}
                                    </a>
                                </Show>
                            );
                        })}
                    </div>
                )}

                {/* LINKS GROUP */}
                {!!props.comps.links?.length && (
                    <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36 select-none">
                        <span class="font-semibold text-gray-400">
                            {props.labelOfFeature}
                        </span>
                        <div class="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
                            {props.comps.links.map((Link) => {
                                return (
                                    <a
                                        href={Link.href}
                                        class="mr-5 mb-5 lg:mb-0">
                                        {Link.comp({})}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
