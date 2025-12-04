"use client";
import ThemeToggle from '@/components/theme/ThemeToggle';
import React, { useState } from 'react';

const AuthPage: React.FC = () => {
    // const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

    return (
        <body className="font-display bg-background-light dark:bg-background-dark antialiased">
            {/* <ThemeToggle /> */}
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden p-4 md:p-8">
                <div className="absolute top-0 xl:left-36 p-6 md:p-8">
                    <header className="flex items-center gap-4 text-gray-800 dark:text-foreground">
                        <div className="size-6 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">ProfitPilot</h2>
                    </header>
                </div>
                <div className="w-full max-w-6xl">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* <!-- Left Column: Hero/Branding --> */}
                        <div className="hidden flex-col justify-center gap-8 text-left lg:flex">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-foreground     xl:text-4xl">
                                    Automate Your Messenger, Elevate Your Business
                                </h1>
                                <h2 className="text-base font-normal leading-normal  dark:text-neutral-500 xl:text-lg">
                                    The AI-powered chatbot system to drive sales and delight customers on Facebook.
                                </h2>
                            </div>
                            <div
                                className="w-full rounded-xl bg-gray-200 dark:bg-gray-800/50 aspect-video bg-cover bg-center"
                                data-alt="Abstract purple and blue gradient representing AI technology"
                                style={{
                                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuACBC9YMvHDh7-fONPDltre6kB_EvEJ00e_au9m7usBbtdFWB81TL0ATB2_K4hN8yvgyK-9IkfJK3JQTBO8qZGmgGsrepf745wc6_70M1CKmJaYrKLTUipqYfX0fx47psuSG8Sylk542aPg0GqYZ9QyWB2x269D9FSgjedsOS5aQ0bAZBj36hWFRlg6cIvCqVzj4sFwtHKbcOXw-IILFX_tTskRE3qGFFxL4vDuoZx1i7Lz-2JTfJd8GlmX-Okkg4FDcfa7qNgCfow")`,
                                    backgroundPosition: "center", // optional — bg-center class already does this
                                    backgroundSize: "cover",      // optional — bg-cover class already does this
                                }}
                            />
                        </div>
                        {/* <!-- Right Column: Form --> */}
                        <div className="flex w-full max-w-md flex-col justify-center mx-auto lg:mx-0 lg:max-w-none">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Sign In</p>
                                    <p className="text-base font-normal text-neutral-500  ">
                                        New to ProfitPilot? <a className="font-medium text-primary hover:underline" href="#">Create an account</a>
                                    </p>
                                </div>
                                {/* <!-- Segmented Buttons could go here if needed, but the text link above is cleaner --> */}
                                <div className="flex flex-col gap-5">
                                    <label className="flex flex-col w-full">
                                        <p className="pb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</p>
                                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-background dark:bg-background px-4 py-3 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700  dark:text-white dark:placeholder:text-neutral-500 " placeholder="Enter your email" value="" />
                                    </label>
                                    <label className="flex flex-col w-full">
                                        <div className="flex items-center justify-between pb-2">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</p>
                                            <a className="text-sm font-medium text-primary hover:underline" href="#">Forgot password?</a>
                                        </div>
                                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-background dark:bg-background  px-4 py-3 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700  dark:text-white dark:placeholder:text-neutral-500    " placeholder="Enter your password" type="password" value="" />
                                    </label>
                                    <button className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark">Sign In</button>
                                </div>
                                <div className="relative">
                                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-background-light dark:bg-background-dark px-2 text-neutral-500 ">Or continue with</span>
                                    </div>
                                </div>
                                <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-6 text-base font-semibold text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-700 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus:ring-gray-500 dark:focus:ring-offset-background-dark">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.5777 12.2773C22.5777 11.4309 22.5085 10.6136 22.3785 9.82727H12.0001V14.4545H18.0501C17.7801 16.0364 16.9201 17.3773 15.6101 18.2909V21.0955H19.5077C21.4677 19.2409 22.5777 16.0364 22.5777 12.2773Z" fill="#4285F4"></path>
                                        <path d="M12.0001 23.0002C15.1101 23.0002 17.7378 21.9547 19.5078 20.0957L15.6101 18.2911C14.5601 18.9957 13.3301 19.4275 12.0001 19.4275C9.44011 19.4275 7.25011 17.7593 6.44011 15.4866L2.42011 15.4866V18.3684C4.18011 21.132 7.79011 23.0002 12.0001 23.0002Z" fill="#34A853"></path>
                                        <path d="M6.44011 15.4864C6.18011 14.7818 6.02011 14.0182 6.02011 13.2273C6.02011 12.4364 6.18011 11.6727 6.44011 10.9682V8.08636L2.42011 8.08636C1.69011 9.61364 1.27011 11.35 1.27011 13.2273C1.27011 15.1045 1.69011 16.8409 2.42011 18.3682L6.44011 15.4864Z" fill="#FBBC05"></path>
                                        <path d="M12.0001 7.02727C13.4301 7.02727 14.6501 7.51364 15.6501 8.44545L19.5801 4.51818C17.7301 2.85 15.1101 1.90909 12.0001 1.90909C7.79011 1.90909 4.18011 3.77727 2.42011 6.54091L6.44011 9.42273C7.25011 7.15 9.44011 5.48182 12.0001 7.02727V7.02727Z" fill="#EA4335"></path>
                                    </svg>
                                    <span>Sign in with Google</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default AuthPage;