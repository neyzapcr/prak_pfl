import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function ErrorPage({
  code = "404",
  description = "What are you doing here?!",
  image = "/img/error-404.png",
}) {
  const codeText = String(code);
  const firstNumber = codeText[0];
  const lastNumber = codeText[2];

  const getColor = () => {
    if (codeText === "400") return "text-yellow-400";
    if (codeText === "401") return "text-purple-600";
    if (codeText === "403") return "text-orange-500";
    if (codeText === "404") return "text-blue-700";
    return "text-purple-600";
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-hidden bg-white">
      <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[28px] bg-white px-6 py-4 text-center">
        <h1 className="font-poppins text-5xl font-black italic text-indigo-800">
          hey!
        </h1>

        <p className="mt-3 text-sm font-semibold text-indigo-700">
          {description}
        </p>

        <div className="group mt-6 flex items-center justify-center gap-4">
          <span
            className={`text-[115px] font-black leading-none md:text-[155px] ${getColor()}`}
          >
            {firstNumber}
          </span>
          <div className="relative flex h-28 w-28 items-center justify-center md:h-36 md:w-36">
            <span
              className={`absolute text-[115px] font-black leading-none md:text-[155px] ${getColor()}`}
            ></span>

            {/* blur glow di belakang gambar */}
            <div
              className={`absolute z-0 h-32 w-32 md:h-44 md:w-44 rounded-full blur-3xl opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-150 ${
                codeText === "400"
                  ? "bg-yellow-400"
                  : codeText === "401"
                    ? "bg-purple-500"
                    : codeText === "403"
                      ? "bg-orange-500"
                      : "bg-blue-500"
              }`}
            ></div>

            <img
              src={image}
              alt={`Error ${codeText}`}
              className="relative z-10 h-28 w-28 rounded-[28px] object-cover transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-110 group-hover:rotate-3 md:h-36 md:w-36"
            />
          </div>

          <span
            className={`text-[115px] font-black leading-none md:text-[155px] ${getColor()}`}
          >
            {lastNumber}
          </span>
        </div>

        <Link
          to="/"
          className="mt-8 flex items-center gap-2 rounded-full border-2 border-gray-800 bg-purple-50 px-5 py-2 text-sm font-semibold text-gray-800 shadow-md transition hover:bg-purple-100 hover:scale-105"
        >
          <FaArrowLeft />
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
