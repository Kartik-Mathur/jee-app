import React from "react";

const FilterPanel = ({ filters, setFilters, programs }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleProgram = (program) => {
    const isSelected = filters.programs.includes(program);
    const updated = isSelected
      ? filters.programs.filter((p) => p !== program)
      : [...filters.programs, program];

    setFilters({ ...filters, programs: updated });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Institute Type</h3>
        <select
          name="instituteType"
          value={filters.instituteType}
          onChange={handleChange}
          className="w-full mt-2 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All</option>
          <option value="IIT">IIT</option>
          <option value="NIT">NIT</option>
          <option value="IIIT">IIIT</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Sort By</h3>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="w-full mt-2 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="openingAsc">Opening Rank ↑</option>
          <option value="openingDesc">Opening Rank ↓</option>
          <option value="closingAsc">Closing Rank ↑</option>
          <option value="closingDesc">Closing Rank ↓</option>
        </select>
      </div>

      {/* Quota */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Quota</h3>
        <select
          name="quotaFilter"
          value={filters.quotaFilter}
          onChange={handleChange}
          className="w-full mt-2 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Quotas</option>
          <option value="AI">All India (AI)</option>
          <option value="HS">Home State (HS)</option>
          <option value="OS">Other State (OS)</option>
        </select>
      </div>

      {/* Programs */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Programs</h3>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 max-h-100 overflow-y-auto pr-1">
          {programs.map((program, index) => (
            <label
              key={index}
              className="text-sm text-gray-700 hover:text-blue-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.programs.includes(program)}
                onChange={() => toggleProgram(program)}
                className="mr-2 accent-blue-600"
              />
              {program}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
