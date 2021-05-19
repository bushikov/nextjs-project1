import Search from "../public/svg/fontawesome/solid/search.svg";

export interface SearchBoxProps {
  placeholder?: string;
  onChange: (string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  onChange,
}) => (
  <div className="field">
    <p className="control has-icons-left">
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="icon is-small is-left">
        <Search style={{ height: "40%" }} />
      </span>
    </p>
  </div>
);
