import los from "../../../images/homepage/cities/los.jpg";
import miami from "../../../images/homepage/cities/miami.jpg";
import nyc from "../../../images/homepage/cities/nyc.webp";
import san from "../../../images/homepage/cities/san.webp";

export default function SectionThree() {
  return (
    <div>
      <FeaturedCities></FeaturedCities>
    </div>
  );
}

const featured_cities = [
  {
    location: "San Francisco",
    quantity: 805,
    img: san,
  },
  {
    location: "New york",
    quantity: 428,
    img: nyc,
  },
  {
    location: "Los Angeles",
    quantity: 376,
    img: los,
  },
  {
    location: "Miami",
    quantity: 200,
    img: miami,
  },
];

function FeaturedCities() {
  return (
    <div>
      <p className="text-center font-mono text-gray-600 text-xl font-semibold">
        Featured Cities
      </p>
      <div className="flex flex-wrap justify-center gap-6 px-4 ">
        {featured_cities.map((city, indx) => (
          <RenderFeaturedCities
            key={indx}
            indx={indx}
            location={city.location}
            quantity={city.quantity}
            img={city.img}
          ></RenderFeaturedCities>
        ))}
      </div>
    </div>
  );
}

function RenderFeaturedCities({ location, quantity, img }) {
  return (
    <div
      className="relative w-64 h-80 bg-cover bg-center rounded-lg overflow-hidden shadow-lg hover:scale-95 "
      style={{ backgroundImage: `url("${img}")` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0  bg-opacity-40"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-end items-end text-gray-900 p-4">
        <p className="text-lg font-semibold">{location}</p>
        <p className="text-sm">{quantity} Jobs</p>
      </div>
    </div>
  );
}
