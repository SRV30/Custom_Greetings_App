const GreetingCard = ({ template, userName, profileImage, message, quote }) => {
  return (
    <div
      className="
        relative
        w-85
        sm:w-125
        md:w-175
        lg:w-212.5
        aspect-video
        overflow-hidden
        rounded-4xl
        shadow-2xl
      "
      style={{ backgroundColor: "#ffffff" }}
    >
      <img
        src={template.image}
        alt={template.title}
        className="w-full h-full object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0), rgba(0,0,0,0.7))",
        }}
      ></div>

      <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3 z-10">
        <img
          src={profileImage}
          alt="profile"
          className="
            w-12 h-12
            md:w-16 md:h-16
            rounded-full
            border-4
            border-white
            shadow-lg
            object-cover
          "
        />

        <div>
          <h1 className="text-white text-xl md:text-3xl font-bold leading-none">
            {userName}
          </h1>

          <p
            className="text-xs md:text-sm mt-1"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Special Wishes
          </p>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-20">
        <p
          className="
            text-xl
            md:text-4xl
            font-semibold
            italic
            text-center
            leading-relaxed
            max-w-125
          "
          style={{ color: "#374151" }}
        >
          {message}
        </p>
      </div>

      <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 right-5 md:right-8 z-10">
        <p
          className="
            text-lg
            md:text-3xl
            font-bold
            leading-relaxed
            max-w-125
          "
          style={{ color: "#ffffff" }}
        >
          {quote}
        </p>
      </div>

      {template.premium && (
        <div
          className="
            absolute
            top-4
            right-4
            md:top-6
            md:right-6
            px-3
            md:px-4
            py-1
            rounded-full
            text-xs
            md:text-sm
            font-bold
            z-10
          "
          style={{
            backgroundColor: "#facc15",
            color: "#000000",
          }}
        >
          Premium
        </div>
      )}
    </div>
  );
};

export default GreetingCard;
