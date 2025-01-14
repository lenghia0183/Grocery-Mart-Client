'use client';

import useTheme from '@/hooks/useTheme';

export default function Home() {
    const { activeTheme, handleThemeChange } = useTheme();

    return (
        <main className="flex items-center justify-center p-96 pt-32">
            <div>
                <h1 className="text-center font-bold text-slate-900 dark:text-cyan-500 text-5xl leading-tight mb-3">
                    Tailwind CSS: Dark Mode Tutorial
                </h1>
                <p className="text-lg font-medium text-slate-700 dark:text-cyan-700 text-center mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam corporis officia illum saepe
                    voluptates, assumenda molestiae exercitationem quisquam illo omnis? Fuga, voluptates? Eum dolor
                    ipsam expedita perspiciatis doloremque, ad illo!
                </p>

                <div className="flex items-center">
                    {['light', 'dark', 'system'].map((theme) => (
                        <button
                            key={theme}
                            onClick={() => handleThemeChange(theme)}
                            className={`flex justify-center items-center m-auto text-lg w-fit transition-color duration-200 ease-in-out py-3 px-10 rounded-lg font-semibold py-[10px] px-4 ${
                                activeTheme === theme
                                    ? 'bg-cyan-800 text-gray-50 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300 hover:bg-slate-600 text-gray-50'
                                    : 'bg-slate-500 dark:bg-slate-600 hover:bg-cyan-800 text-gray-100 dark:text-gray-400'
                            }`}
                        >
                            {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
                        </button>
                    ))}
                </div>
            </div>
        </main>
    );
}
