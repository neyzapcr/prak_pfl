import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="min-h-screen bg-blue-100 p-10 text-blue-900">
            <h1 className="text-4xl font-extrabold text-center mb-12 tracking-widest">
                THE FRAMEWORKS: Y2K EDITION
            </h1>

            <div className="grid md:grid-cols-2 gap-10">
                {frameworkData.map((item) => (
                    <div
                        key={item.id}
                        className="relative p-6 rounded-xl bg-blue-200 shadow-lg
                                   border border-blue-600 transition-transform
                                   hover:scale-105 hover:bg-blue-300 hover:shadow-xl
                                   hover:rotate-2 hover:translate-y-2"
                    >
                        {/* tape effect */}
                        <div className="absolute top-0 left-0 w-14 h-4 bg-blue-400 rounded-tl-xl 
                                        transform -rotate-12 opacity-80 transition-all duration-300
                                        hover:w-16 hover:h-5 hover:bg-blue-500"></div>

                        {/* content */}
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black tracking-wide mb-2">
                                {item.name}
                            </h2>

                            <p className="italic text-gray-700 mb-4">
                                "{item.description}"
                            </p>

                            <div className="text-sm text-gray-600 mb-4">
                                <p>📍 Dev: {item.details.developer}</p>
                                <p>📅 Year: {item.details.releaseYear}</p>
                            </div>

                            <a
                                href={item.details.officialWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 border border-blue-500
                                           text-blue-800 hover:bg-blue-400 hover:text-white
                                           transition duration-300 text-sm font-semibold"
                            >
                                VISIT SOURCE ↗
                            </a>
                        </div>

                        {/* Big background text like sticky note */}
                        <div className="absolute bottom-2 right-2 text-5xl font-extrabold text-blue-500
                                        opacity-30 tracking-widest">
                            {item.name.slice(0, 4).toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}