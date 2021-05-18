import { useState } from "react";

export interface TabProps {
  labels: string[];
  onChange: (index: number) => void;
}

export const Tab: React.FC<TabProps> = ({ labels, onChange }) => {
  const [selected, setSelected] = useState(0);

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
