const Header = () => {
  return (
      <div className="bg-gray-500 flex items-center justify-between text-white p-4 text-xl font-bold w-full">
          {/* Spacer to push "Get RC" to the center */}
          <div className="flex-1"></div>

          {/* Centered text */}
          <div className="flex-none text-center">
              Get RC
          </div>

          {/* Logout button */}
          <div className="flex-1 flex justify-end">
              <div className="px-6 py-2 bg-white text-black rounded-lg">
                  Logout
              </div>
          </div>
      </div>
  );
};

export default Header;
