interface CheckBoxProps {
  checked: boolean;
  onChange: () => void;
  title: string;
}

export default function CheckBox({ title, checked, onChange }: CheckBoxProps) {
  return (
    <div className="flex gap-3 items-start">
      <label className="rounded-checkbox">
        <input
          checked={checked}
          onChange={onChange}
          type="checkbox"
        />
        <span className="checkmark"></span>
      </label>
      <h1>{title}</h1>
    </div>
  )
}
