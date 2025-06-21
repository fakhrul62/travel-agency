import { Header } from "components";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import type { Route } from "./+types/CreateTrip";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatKey } from "~/lib/utils";
import useAuth from "src/hook/useAuth";
import useAxiosPublic from "src/hook/useAxiosPublic";
import { useNavigate } from "react-router";
import { generateTrip } from "app/routes/api/CreateTrip";

type Country = {
  name: string;
  coordinates: [number, number];
  value: string;
  openStreetMap?: string;
  flag: string;
};

type TripFormData = {
  country: string;
  travelStyle: string;
  interest: string;
  budget: string;
  duration: number;
  groupType: string;
  [key: string]: string | number;
};

export const loader = async () => {
  const res = await fetch("https://restcountries.com/v3.1/independent?status=true");
  const data = await res.json();
  return data.map((country: any) => ({
    name: country.name.common,
    coordinates: country.latlng as [number, number],
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMaps,
    flag: country.flags.svg,
  }));
};

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[];
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });

  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [queries, setQueries] = useState<Record<string, string>>({
    groupType: "",
    travelStyle: "",
    interest: "",
    budget: "",
  });

  const handleChange = (field: keyof TripFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !formData.country ||
      !formData.duration ||
      !formData.groupType ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (formData.duration < 1 || formData.duration > 10) {
      setError("Duration must be between 1 and 10 days.");
      setLoading(false);
      return;
    }

    if (!user) {
      setError("You must be logged in to create a trip.");
      setLoading(false);
      return;
    }

    try {
      const tripData = {
        country: selectedCountry?.name || formData.country,
        duration: formData.duration,
        groupType: formData.groupType,
        travelStyle: formData.travelStyle,
        interest: formData.interest,
        budget: formData.budget,
        user, // ✅ pass full user object
      };

      console.log("📦 Sending trip data:", tripData);
      const response = await generateTrip(tripData);
      console.log("✅ Trip created:", response);

      if (response?.insertedId) {
        navigate(`/trip/${response.insertedId}`);
      } else {
        throw new Error("Trip ID missing in response.");
      }
    } catch (error) {
      console.error("❌ Error creating trip:", error);
      setError("Failed to create trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCountry =
    query === ""
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <main className="wrapper flex flex-col gap-10 pb-20">
      <Header title="Add a new trip" subtitle="View and Edit AI-generated travel plans" />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <div className="!p-0">
              <Combobox
                value={selectedCountry}
                onChange={(value) => setSelectedCountry(value)}
                onClose={() => setQuery("")}
              >
                <div className="relative w-full !p-0">
                  <div className="relative flex items-center !p-0">
                    {selectedCountry?.flag && (
                      <img
                        src={selectedCountry.flag}
                        alt={`${selectedCountry.name} flag`}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-3 z-10"
                      />
                    )}
                    <ComboboxInput
                      className={clsx(
                        "!w-full p-3.5",
                        selectedCountry?.flag ? "pl-10" : "pl-3",
                        "text-base text-black",
                        "border border-light-400 rounded-xl text-dark-300 font-normal"
                      )}
                      displayValue={(country: Country) => country?.name || ""}
                      placeholder="Select a country"
                      id="country"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute bg-zinc-100 rounded-lg inset-y-0 right-0 px-2.5">
                      <ChevronDownIcon className="size-4 fill-black group-data-hover:fill-gray-950" />
                    </ComboboxButton>
                  </div>
                </div>
                <ComboboxOptions
                  anchor="bottom"
                  transition
                  className={clsx(
                    "w-(--input-width) rounded-xl border border-gray-300 bg-white p-1 [--anchor-gap:--spacing(1)] empty:invisible",
                    "transition duration-100 ease-in data-leave:data-closed:opacity-0 shadow-dark-100"
                  )}
                >
                  {filteredCountry.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredCountry.map((country) => (
                      <ComboboxOption
                        key={country.value}
                        value={country}
                        className="group flex cursor-default items-center gap-2 shadow-dark-100 rounded-lg px-3 py-1.5 select-none data-focus:bg-gray-100"
                      >
                        <CheckIcon className="invisible size-4 fill-black group-data-selected:visible" />
                        <div className="text-sm/6 text-black flex items-center gap-2">
                          {country.flag && (
                            <img
                              src={country.flag}
                              alt={`${country.name} flag`}
                              className="w-5 h-3 object-contain"
                            />
                          )}
                          {country.name}
                        </div>
                      </ComboboxOption>
                    ))
                  )}
                </ComboboxOptions>
              </Combobox>
            </div>
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <input
              type="number"
              id="duration"
              placeholder="Enter a number of days (5, 12 ...)"
              className="form-input placeholder:text-gray-100"
              name="duration"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>

          {selectItems.map((item) => (
            <div key={item}>
              <label htmlFor={item}>{formatKey(item)}</label>
              <div className="!p-0">
                <Combobox
                  value={(formData[item] as string) || ""}
                  onChange={(value) => handleChange(item, value)}
                  onClose={() =>
                    setQueries((prev) => ({ ...prev, [item]: "" }))
                  }
                >
                  <div className="relative w-full !p-0">
                    <div className="relative flex items-center !p-0">
                      <ComboboxInput
                        className={clsx(
                          "!w-full p-3.5",
                          "pl-3",
                          "text-base text-black",
                          "border border-light-400 rounded-xl text-dark-300 font-normal"
                        )}
                        displayValue={(option: string) => option || ""}
                        placeholder={`Select ${formatKey(item)}`}
                        id={item}
                        onChange={(event) =>
                          setQueries((prev) => ({
                            ...prev,
                            [item]: event.target.value,
                          }))
                        }
                      />
                      <ComboboxButton className="group absolute bg-zinc-100 rounded-lg inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className="size-4 fill-black group-data-hover:fill-gray-950" />
                      </ComboboxButton>
                    </div>
                  </div>

                  <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                      "w-(--input-width) rounded-xl border border-gray-300 bg-white p-1 [--anchor-gap:--spacing(1)] empty:invisible",
                      "transition duration-100 ease-in data-leave:data-closed:opacity-0"
                    )}
                  >
                    {comboBoxItems[item]
                      .filter((option) =>
                        option
                          .toLowerCase()
                          .includes((queries[item] || "").toLowerCase())
                      )
                      .map((option) => (
                        <ComboboxOption
                          key={option}
                          value={option}
                          className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-gray-100"
                        >
                          <CheckIcon className="invisible size-4 fill-black group-data-selected:visible" />
                          <div className="text-sm/6 text-black">{option}</div>
                        </ComboboxOption>
                      ))}
                  </ComboboxOptions>
                </Combobox>
              </div>
            </div>
          ))}

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <footer className="px-6 w-full">
            <button
              className="button-class w-full mt-4 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
              type="submit"
              disabled={loading}
            >
              <img
                src={`/assets/icons/${loading ? "loader.svg" : "magic-star.svg"}`}
                className={cn("size-5", { "animate-spin": loading })}
                alt="submit"
              />
              Generating Trip
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
