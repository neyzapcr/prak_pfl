import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  /** Deklarasi state */
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTag, setSelectedTag] = useState("");

/*Inisialisasi DataForm*/
		const [dataForm, setDataForm] = useState({
			searchTerm: "",
			selectedTag: "",
			/*Tambah state lain beserta default value*/
			});
		
		/*Inisialisasi Handle perubahan nilai input form*/
		const handleChange = (evt) => {
			const { name, value } = evt.target;
			setDataForm({
				...dataForm,
				[name]: value,
			});
		};
  
  /** Logic Search & Filter */
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm) ||
      framework.details.releaseYear.toString().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  /** Ambil unique tags */
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="min-h-screen bg-blue-100 p-10 text-blue-900">
      <h1 className="text-4xl font-extrabold text-center mb-12 tracking-widest">
        THE FRAMEWORKS: Y2K EDITION
      </h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            name="searchTerm"
            value={dataForm.searchTerm}
            placeholder="Search framework..."
            className="w-full max-w-xl h-12 p-3 rounded-4xl bg-white border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-500 text-blue-800 transition duration-300 ease-in-out"
            onChange={handleChange}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex-1 max-w-xs">
          <select
            name="selectedTag"
            className="w-full h-12 p-3 rounded-lg bg-white border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-blue-800 transition duration-300 ease-in-out"
            onChange={handleChange}
            value={dataForm.selectedTag}
          >
            <option value="">All Tags</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Framework Cards */}
      <div className="grid md:grid-cols-2 gap-10">
        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="relative p-6 rounded-xl bg-blue-200 shadow-lg
                                   border border-blue-600 transition-transform
                                   hover:scale-105 hover:bg-blue-300 hover:shadow-xl
                                   hover:rotate-2 hover:translate-y-2"
          >
            {/* Tape effect */}
            <div
              className="absolute top-0 left-0 w-14 h-4 bg-blue-400 rounded-tl-xl 
                                        transform -rotate-12 opacity-80 transition-all duration-300
                                        hover:w-16 hover:h-5 hover:bg-blue-500"
            ></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-black tracking-wide mb-2">
                {item.name}
              </h2>

              <p className="italic text-gray-700 mb-4">"{item.description}"</p>

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

            {/* Big background text (sticky note style) */}
            <div
              className="absolute bottom-2 right-2 text-5xl font-extrabold text-blue-500
                                        opacity-30 tracking-widest"
            >
              {item.name.slice(0, 4).toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}