import { useState } from 'preact/hooks';
import IconChevronDown from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/chevron-down.tsx"

interface CustomSelectProps {
  options: string[];
  label: string;
}

const CustomSelect: preact.FunctionComponent<CustomSelectProps> = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para abrir/fechar o dropdown
  const [selectedOption, setSelectedOption] = useState<string>(options[0]); // Estado da opção selecionada

  // Função para selecionar uma opção
  const handleSelectOption = (option: string): void => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div class="w-full max-w-xs mx-auto">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div class="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          class="block appearance-none w-full bg-white border 
          border-gray-300 hover:border-gray-500 py-3 px-10 rounded 
          shadow leading-tight focus:outline-none focus:ring-2 
          focus:ring-blue-600 focus:border-blue-600 transition 
          duration-300 ease-in-out"
        >
          {selectedOption}
          <span class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <IconChevronDown class="w-6 h-6" />
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
            <ul 
                class="absolute z-10 mt-1 w-full bg-white border 
                border-gray-300 rounded shadow-lg max-h-60 
                overflow-auto"
            >
            {options.map((option, index) => (
                <li
                    key={index}
                    onClick={() => handleSelectOption(option)}
                    class="cursor-pointer px-4 py-2 hover:bg-blue-500 
                    hover:text-white transition-colors"
                >
                    {option}
                </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;