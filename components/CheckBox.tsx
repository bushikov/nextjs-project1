import { useRef } from "react";

const styles: { [key: string]: React.CSSProperties } = {
  label: { paddingRight: "1rem" },
  input: { marginRight: "0.25rem" },
};

export interface CheckBoxProps {
  label: string;
  onChange: (boolean) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ label, onChange }) => (
  <label className="checkbox" key={label} style={styles.label}>
    <input
      type="checkbox"
      style={styles.input}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
    />
    {label}
  </label>
);
