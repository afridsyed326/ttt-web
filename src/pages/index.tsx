import { motion } from "framer-motion";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function IndexPage() {
    return (
        <DefaultLayout>
            <div className="min-h-screen flex flex-col rounded-xl">
                {/* Hero Section */}
                <section className="flex flex-col items-center justify-center text-center py-20 px-6">
                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold text-primary"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Play Tic Tac Toe Anytime
                    </motion.h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                        Challenge your friends or compete against players around
                        the world. Track your wins, climb the leaderboard, and
                        relive the classic game with a modern twist.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <Link
                            className="flex justify-start items-center gap-1"
                            color="foreground"
                            href="/play"
                        >
                            <Button
                                size="lg"
                                className="px-8 py-4 text-lg bg-primary text-white"
                            >
                                Play Now
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="grid md:grid-cols-3 gap-8 px-8 md:px-20 pb-5">
                    {[
                        {
                            title: "Quick Matches",
                            desc: "Jump straight into a fast-paced game in just seconds.",
                        },
                        {
                            title: "Global Leaderboard",
                            desc: "Compete with players worldwide and prove your skills.",
                        },
                        {
                            title: "Cross-Platform",
                            desc: "Play seamlessly on desktop, tablet, or mobile.",
                        },
                    ].map((f, i) => (
                        <motion.div
                            key={i}
                            className="bg-primary/20 border-2 border-primary rounded-2xl shadow-md p-8 text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-2xl font-semibold text-primary mb-3">
                                {f.title}
                            </h3>
                            <p className="dark:text-gray-600">{f.desc}</p>
                        </motion.div>
                    ))}
                </section>

                {/* How It Works Section */}
                <section className="px-8 md:px-20 py-20 bg-primary/20 rounded-xl text-center ">
                    <h2 className="text-3xl font-bold mb-10">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                step: "1",
                                title: "Sign Up",
                                desc: "Create your free account in seconds.",
                            },
                            {
                                step: "2",
                                title: "Choose Mode",
                                desc: "Play against friends or challenge random opponents.",
                            },
                            {
                                step: "3",
                                title: "Start Playing",
                                desc: "Make your move and enjoy the game!",
                            },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-col items-center bg-primary/20 border-2 border-primary rounded-2xl shadow-md p-6"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-4xl font-bold text-primary-600 mb-4">
                                    {s.step}
                                </div>
                                <h4 className="text-xl font-semibold mb-2">
                                    {s.title}
                                </h4>
                                <p className="dark:text-gray-200">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center flex flex-col sm:flex-row justify-center items-center gap-2 py-10">
                    <motion.h2
                        className="text-4xl font-bold text-gray-800 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Ready to Join the Fun?
                    </motion.h2>
                    <Link
                        className="flex justify-start items-center gap-1"
                        color="foreground"
                        href="/play"
                    >
                        <Button
                            size="lg"
                            className="px-10 py-5 bg-primary text-white text-lg"
                        >
                            Get Started
                        </Button>
                    </Link>
                </section>
            </div>
        </DefaultLayout>
    );
}
