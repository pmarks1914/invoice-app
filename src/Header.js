import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, SearchIcon, BellIcon, NewspaperIcon, UserIcon } from '@heroicons/react/outline';


const Header = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', icon: <HomeIcon className="h-6 w-6" />, route: '/home' },
    // { name: 'Search', icon: <SearchIcon className="h-6 w-6" />, route: '/search' },
    { name: 'Invoice', icon: <NewspaperIcon className="h-6 w-6" />, route: '/invoice' },
    { name: 'Profile', icon: <UserIcon className="h-6 w-6" />, route: '/profile' },
  ];

  return (
    // <div className="fixed bottom-0 w-full bg-white shadow-lg border-t md:hidden">
    <div className="fixed position-relative top-0 w-full bg-white shadow-lg border-t mb-3">
      <div className="flex p-3">
        Welcome <span className="text-xs mt-1"> {} </span>
      </div>
    </div>
  );
};


export default Header;
