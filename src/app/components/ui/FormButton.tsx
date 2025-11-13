type FormButtonProps = {
  label: string;
  className?: string;
};

const FormButton = ({ label, className }: FormButtonProps) => {
  return (
    <button
      type="submit"
      className={`${className} w-full text-white font-bold bg-[#107BC0] hover:bg-[#9353e5] rounded-md text-lg sm:text-[20px] justify-center px-[2rem] py-[0.8rem]`}
    >
      {label}
    </button>
  );
};

export default FormButton;
