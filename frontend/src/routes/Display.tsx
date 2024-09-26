import { AuroraBackground } from "../components/ui/aurora";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";

export function Display() {
  const placeholders = [
    "Type the Country name...",
    "Type the Company name..."
    
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="flex flex-col justify-center items-center px-4 w-screen h-screen relative">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-slate-300 font-semibold">
        Type the company name
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <AuroraBackground
            className="-z-10 absolute inset-0"
            children={undefined}
          />
    </div>
  );
}

