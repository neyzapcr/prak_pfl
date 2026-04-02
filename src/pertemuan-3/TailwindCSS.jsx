export default function TailwindCSS() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

            <FlexboxGrid />

            <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">

                {/* HERO */}
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-extrabold text-blue-700">
                        Belajar Tailwind CSS 4
                    </h1>
                    <p className="text-gray-500 italic">
                        Kombinasi card outline, filled, dan gradient.
                    </p>
                </div>

                <Typography />

                {/* 3 CARD */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Spacing />
                    <BackgroundColors />
                    <GradientCard />
                </div>

                <ShadowEffects />
                <BorderRadius />


            </div>
        </div>
    );
}

function FlexboxGrid() {
    return (
        <nav className="sticky top-0 bg-white/90 backdrop-blur border-b border-blue-100">
            <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
                <h1 className="text-lg font-bold text-blue-600">MyWebsite</h1>
                <ul className="flex space-x-6 text-gray-600">
                    <li><a href="#" className="hover:text-blue-600">Home</a></li>
                    <li><a href="#" className="hover:text-blue-600">About</a></li>
                    <li><a href="#" className="hover:text-blue-600">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}

function Typography() {
    return (
        <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-blue-600">
                Card Styles
            </h2>
            <p className="text-gray-500">
                Outline, filled, dan gradient dalam satu tampilan.
            </p>
        </div>
    );
}

/* OUTLINE */
function Spacing() {
    return (
        <div className="bg-white border border-blue-200 p-6 rounded-2xl hover:shadow-md hover:border-blue-400 transition">
            <h2 className="text-lg font-semibold text-blue-700">
                Outline Card
            </h2>
            <p className="mt-2 text-gray-500">
                Tampilan ringan dengan border luar.
            </p>
        </div>
    );
}

/* FILLED */
function BackgroundColors() {
    return (
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-md hover:bg-blue-700 transition">
            <h3 className="text-lg font-bold">Filled Card</h3>
            <p className="mt-2 opacity-90">
                Card dengan warna solid untuk fokus utama.
            </p>
        </div>
    );
}

/* GRADIENT BARU */
function GradientCard() {
    return (
        <div className="bg-gradient-to-br from-blue-500 via-blue-300 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-lg font-bold text-blue-800">
                Gradient Card
            </h3>
            <p className="mt-2 text-blue-700">
                Perpaduan biru ke putih memberikan kesan soft dan modern.
            </p>
        </div>
    );
}

function BorderRadius() {
    return (
        <div className="flex justify-center gap-4">

            <button className="border border-blue-500 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition">
                Outline
            </button>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">
                Filled
            </button>

        </div>
    );
}

function ShadowEffects() {
    return (
        <div className="max-w-md mx-auto bg-white border border-blue-100 p-6 rounded-2xl text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <h3 className="text-lg font-semibold text-blue-700">
                Elegant Shadow
            </h3>
            <p className="text-gray-500 mt-2">
                Card tidak full lebar, jadi lebih fokus dan elegan.
            </p>
        </div>
    );
}