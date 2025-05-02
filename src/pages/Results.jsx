import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import collegesData from "../data/colleges2024.json";
import FilterPanel from "../components/FilterPanel";

const getTag = (userRank, opening, closing) => {
  const range = closing - opening;
  if (userRank <= opening + range * 0.15) return "Dream";
  if (userRank <= opening + range * 0.7) return "Target";
  return "Safe";
};

const getInstituteTag = (name) => {
  if (/INDIAN INSTITUTE OF TECHNOLOGY(?!.*INFORMATION)/i.test(name))
    return "IIT";
  if (/NATIONAL INSTITUTE OF TECHNOLOGY/i.test(name)) return "NIT";
  if (/INFORMATION TECHNOLOGY|IIIT/i.test(name)) return "IIIT";
  if (/CENTRAL UNIVERSITY/i.test(name)) return "Central Univ";
  if (/GATI SHAKTI/i.test(name)) return "Gati Shakti";
  return "Other";
};

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [filters, setFilters] = useState({
    instituteType: "ALL",
    programs: [],
    sort: "openingAsc",
    quotaFilter: "ALL",
  });

  useEffect(() => {
    if (!state) {
      navigate("/predictor");
      return;
    }

    const { rank, category, gender } = state;

    const eligibleColleges = collegesData.filter((college) => {
      return (
        (category === "ALL" || college.seatType === category) &&
        college.gender === gender &&
        college.openingRank <= rank &&
        college.closingRank >= rank
      );
    });

    const programSet = new Set(eligibleColleges.map((c) => c.program));
    setProgramOptions([...programSet].sort());

    let result = [...eligibleColleges];

    if (filters.instituteType !== "ALL") {
      result = result.filter(
        (college) =>
          getInstituteTag(college.institute) === filters.instituteType
      );
    }

    if (filters.quotaFilter !== "ALL") {
      result = result.filter(
        (college) => college.quota === filters.quotaFilter
      );
    }

    if (filters.programs.length > 0) {
      result = result.filter((college) =>
        filters.programs.some((p) =>
          college.program.toLowerCase().includes(p.toLowerCase())
        )
      );
    }

    result.sort((a, b) => {
      switch (filters.sort) {
        case "openingAsc":
          return a.openingRank - b.openingRank;
        case "openingDesc":
          return b.openingRank - a.openingRank;
        case "closingAsc":
          return a.closingRank - b.closingRank;
        case "closingDesc":
          return b.closingRank - a.closingRank;
        default:
          return 0;
      }
    });

    setFiltered(result);
  }, [state, filters, navigate]);

  if (!state) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <div className="grid md:grid-cols-[280px_1fr] gap-6 p-4 sm:p-6 md:p-10">
        {/* Sidebar */}
        <aside className="bg-white shadow rounded-xl p-4 h-fit md:sticky top-10">
          <h2 className="text-lg font-bold mb-2 text-blue-700">
            Filter Options
          </h2>
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            programs={programOptions}
          />
          <button
            onClick={() => navigate("/predictor")}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            ← Back to predictor
          </button>
        </aside>

        {/* Main Content */}
        <main className="w-full">
          <h1 className="text-2xl font-bold mb-2">Eligible Colleges</h1>
          <p className="text-sm text-gray-600 mb-4">
            Based on Rank: <strong>{state.rank}</strong> | Category:{" "}
            <strong>{state.category}</strong> | Quota:{" "}
            <strong>{state.quota}</strong> | Gender:{" "}
            <strong>{state.gender}</strong>
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm bg-white border p-3 rounded-lg shadow-sm">
            <LegendDot
              color="green"
              label="Safe"
              description="Your rank is well within the cutoff. High chance."
            />
            <LegendDot
              color="yellow"
              label="Target"
              description="Your rank is in average zone. Balanced chance."
            />
            <LegendDot
              color="red"
              label="Dream"
              description="Your rank is close to opening. Competitive."
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-gray-600 mt-12">
              🚫 No colleges match your filters.
            </p>
          ) : (
            <>
              {/* Mobile: Card view */}
              <div className="md:hidden space-y-4">
                {filtered.map((college, index) => {
                  const tag = getTag(
                    state.rank,
                    college.openingRank,
                    college.closingRank
                  );
                  return (
                    <div key={index} className="bg-white rounded-lg shadow p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {college.institute}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${
                              getInstituteTag(college.institute) === "IIT"
                                ? "bg-blue-100 text-blue-700"
                                : getInstituteTag(college.institute) === "NIT"
                                ? "bg-yellow-100 text-yellow-700"
                                : getInstituteTag(college.institute) === "IIIT"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {getInstituteTag(college.institute)}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            tag === "Safe"
                              ? "bg-green-100 text-green-700"
                              : tag === "Target"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {tag}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        {college.program}
                      </p>
                      <div className="mt-3 text-xs space-y-1 text-gray-600">
                        <p>
                          <strong>Quota:</strong> {college.quota}
                        </p>
                        <p>
                          <strong>Category:</strong> {college.seatType}
                        </p>
                        <p>
                          <strong>Gender:</strong> {college.gender}
                        </p>
                        <p>
                          <strong>Opening:</strong> {college.openingRank}
                        </p>
                        <p>
                          <strong>Closing:</strong> {college.closingRank}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop/Tablet: Table view */}
              <div className="hidden md:block overflow-x-auto rounded-xl border bg-white shadow">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-blue-50 text-xs uppercase text-gray-600 border-b">
                    <tr>
                      <th className="p-3 whitespace-nowrap">Institute</th>
                      <th className="p-3">Program</th>
                      <th className="p-3">Quota</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Gender</th>
                      <th className="p-3">Opening</th>
                      <th className="p-3">Closing</th>
                      <th className="p-3">Tag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((college, index) => {
                      const tag = getTag(
                        state.rank,
                        college.openingRank,
                        college.closingRank
                      );
                      return (
                        <tr key={index} className="border-t hover:bg-gray-50">
                          <td className="p-3 font-medium text-gray-800 whitespace-nowrap">
                            {college.institute}
                            <span
                              className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                                getInstituteTag(college.institute) === "IIT"
                                  ? "bg-blue-100 text-blue-700"
                                  : getInstituteTag(college.institute) === "NIT"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : getInstituteTag(college.institute) ===
                                    "IIIT"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {getInstituteTag(college.institute)}
                            </span>
                          </td>
                          <td className="p-3">{college.program}</td>
                          <td className="p-3">{college.quota}</td>
                          <td className="p-3">{college.seatType}</td>
                          <td className="p-3">{college.gender}</td>
                          <td className="p-3">{college.openingRank}</td>
                          <td className="p-3">{college.closingRank}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                tag === "Safe"
                                  ? "bg-green-100 text-green-700"
                                  : tag === "Target"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {tag}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const LegendDot = ({ color, label, description }) => {
  const map = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${map[color]}`}></span>
      <span>
        <strong>{label}</strong>: {description}
      </span>
    </div>
  );
};

export default Results;
