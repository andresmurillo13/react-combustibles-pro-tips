/* eslint-disable react/prop-types */


export const Header = ({ totalItems, title }) => (
  <div className=" mx-auto w-11/12">
    <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-gray-400">
      {title}
    </p>
    <p className="text-lg text-gray-400">{totalItems}</p>
  </div>
);

export default Header;
