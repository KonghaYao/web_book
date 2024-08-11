import type { CommonProps } from "./PROPS";

export default (props: CommonProps) => {
    const isDark = props.backgroundImage;
    const bg = "bg-cover bg-blend-multiply bg-gray-900/80 text-white";
    return (
        <section
            class={props.backgroundImage ? bg : "bg-white dark:bg-gray-900 "}
            style={{
                "background-image": `url(${props.backgroundImage})`,
            }}>
            <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div class="mr-auto place-self-center lg:col-span-7">
                    <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                        {props.title}
                    </h1>
                    <p
                        class={
                            "max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400" +
                            (isDark ? " text-gray-400" : "")
                        }>
                        {props.description}
                    </p>
                    {props.comps.form?.({})}
                    {!!props.comps.btn?.length &&
                        props.comps.btn.map((i) => {
                            if (i.isPrimary)
                                return (
                                    <a
                                        href={i.href}
                                        class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                        {i.label}
                                        {i.icon?.({})}
                                    </a>
                                );
                            return (
                                <a
                                    href={i.href}
                                    class={
                                        "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800" +
                                        (isDark
                                            ? " text-white focus:ring-gray-700 hover:bg-gray-700"
                                            : "")
                                    }>
                                    {i.label}
                                    {i.icon?.({})}
                                </a>
                            );
                        })}
                </div>
                <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    {props.comps.heroImage?.({})}
                </div>
                {/* LINKS GROUP */}
                {!!props.comps.links?.length && (
                    <div class="col-span-12 px-4 text-center lg:px-36 mt-8">
                        <span class="font-semibold text-gray-400">
                            {props.labelOfFeature}
                        </span>
                        <div class="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between select-none">
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
