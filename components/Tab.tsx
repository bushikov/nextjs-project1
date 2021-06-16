import { useState } from "react";

export interface TabProps {
  defaultValue?: number;
  labels: string[];
  onChange: (index: number) => void;
}

export const Tab: React.FC<TabProps> = ({
  defaultValue = 0,
  labels,
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultValue);

  return (
    <div className="tabs">
      <ul>
        {labels.map((label, index) => (
          <li className={index === selected ? "is-active" : ""} key={label}>
            <a
              onClick={() => {
                setSelected(index);
                onChange(index);
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
