const Footer = () => {
  return (
    <footer className="bg-[#094063]">
      <div className="text-center p-5">
        <p className="font-medium text-base text-white">
          &copy; {new Date().getFullYear()} DiaCura-med. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
