const GreetingCard = ({ template, userName, profileImage, message, quote }) => {
  return (
    <div className="relative w-385 h-140 overflow-hidden rounded-4xl shadow-2xl bg-white">
      <img
        src={template.image}
        alt={template.title}
        className="w-full h-full object-fit scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/70"></div>

      <div className="absolute top-5 left-5 flex items-center gap-3 z-10">
        <img
          src={profileImage}
          alt="profile"
          className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
        />

        <div>
          <h1 className="text-white text-3xl font-bold tracking-wide leading-none drop-shadow-lg">
            {userName}
          </h1>

          <p className="text-white/80 text-sm mt-1 tracking-wide">
            Special Wishes
          </p>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-10">
        <p className="text-gray-700 text-3xl font-semibold italic text-center leading-relaxed drop-shadow-sm max-w-60">
          {message}
        </p>
      </div>

      <div className="absolute bottom-8 left-6 right-6 z-10">
        <p className="text-white text-2xl font-bold leading-relaxed max-w-65 drop-shadow-xl">
          {quote}
        </p>
      </div>

      {template.premium && (
        <div className="absolute top-5 right-5 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg z-10">
          Premium
        </div>
      )}
    </div>
  );
};

export default GreetingCard;
