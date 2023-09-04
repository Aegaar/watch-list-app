import noImageFound from "../../assets/noImageFound.jpg";

const CardMovie = ({ movieInfo, buttonsNames }) => {
  // console.log(buttonsNames)
  const backgroundStyleHandler = {
    backgroundImage: movieInfo.poster_path
      ? `url(https://image.tmdb.org/t/p/original/${movieInfo.poster_path})`
      : `url(${noImageFound})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "300px",
  };

  let voteClass = "text-black";

  if (movieInfo.vote_average > 8) {
    voteClass = "text-green-500";
  } else if (movieInfo.vote_average > 6.5) {
    voteClass = "text-yellow-500";
  } else if (movieInfo.vote_average > 5) {
    voteClass = "text-orange-500";
  } else if (movieInfo.vote_average < 5 && movieInfo.vote_average === 0) {
    voteClass = "text-red-500";
  }

  const ButtonsRender = (buttonsNames) => {
    return buttonsNames.map((button) => (
      <button
      className={`bg-indigo-600 text-white font-[Poppins] hover:bg-indigo-400 duration-500 mb-3 lg:mb-0 lg:mr-3 text-white font-bold py-2 px-4 rounded ${
        button.type === "REMOVE" ? "bg-red-500 hover:bg-red-400" : "" 
      }`}
      key={button.name}
      onClick={button.onClick}
    >
        {button.name}
      </button>
    ));
  }

  return (
    // <li
    //   key={movieInfo.id}
    //   className="mt-10 border-2 border-indigo-600 rounded-md mr-7 ml-7"
    // >
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div
        className="border-indigo-600 h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={backgroundStyleHandler}
        title="Movie poster"
      ></div>
      <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal flex-grow">
        <div className="mb-8">
          <div className={`font-bold text-xl mb-2 text-indigo-600`}>
            {movieInfo.title}
          </div>
          <p className="text-gray-700 text-base">{movieInfo.overview}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className={`text-lg leading-none`}>
              Vote average{" "}
              <span className={voteClass}>
                {movieInfo.vote_average.toFixed(1)}
              </span>
            </p>
            <p className="text-gray-600 mt-2">
              Release date {movieInfo.release_date}
            </p>
          </div>
        </div>
        <div className="mt-4 lg:mt-5 text-center lg:text-left">
          <div className="lg:flex lg:space-x-3">
            <div>
            {ButtonsRender(buttonsNames)}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </li>
  );
};

export { CardMovie };
