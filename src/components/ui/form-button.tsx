type FormButtonProps = {
  label: string;
  className?: string;
  disabled?: boolean;
};

const FormButton = ({ label, className, disabled }: FormButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${className} w-full text-white font-bold bg-[#107BC0] hover:bg-[#9353e5] rounded-md text-lg sm:text-[20px] justify-center px-[2rem] py-[0.8rem] disabled:opacity-70`}
    >
      {label}
    </button>
  );
};

export default FormButton;
