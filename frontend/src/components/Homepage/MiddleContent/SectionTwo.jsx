//popular job categories
const job_categories = [
  {
    title: "Web & Software Dev",
    details: "Software Engineer, Web/Mobile Developer & More",
    quantity: 612,
    img: "🖥️", // Replace with actual icon if needed
  },
  {
    title: "Data Science & Analytics",
    details: "Data Specialist / Scientist, Data Analyst & More",
    quantity: 113,
    img: "☁️",
  },
  {
    title: "Accounting & Consulting",
    details: "Auditor, Accountant, Financial Analyst & More",
    quantity: 186,
    img: "💼",
  },
  {
    title: "Writing & Translations",
    details: "Copywriter, Creative Writer, Translator & More",
    quantity: 298,
    img: "✍️",
  },
  {
    title: "Sales & Marketing",
    details: "Brand Manager, Marketing Coordinator & More",
    quantity: 549,
    img: "📊",
  },
  {
    title: "Graphics & Design",
    details: "Creative Director, Web Designer & More",
    quantity: 873,
    img: "🖼️",
  },
  {
    title: "Digital Marketing",
    details: "Marketing Analyst, Social Profile Admin & More",
    quantity: 125,
    img: "📢",
  },
  {
    title: "Education & Training",
    details: "Advisor, Coach, Education Coordinator & More",
    quantity: 445,
    img: "🎓",
  },
];
export default function SectionTwo() {
  return (
    <div className="py-10 px-4">
      <p className="font-bold font-mono text-2xl text-gray-700 text-center mb-6">
        Popular Job Categories
      </p>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {job_categories.map((jobs, indx) => (
          <RenderJobCategories
            key={indx}
            title={jobs.title}
            quantity={jobs.quantity}
            details={jobs.details}
            img={jobs.img}
          />
        ))}
      </div>
    </div>
  );
}

function RenderJobCategories({ title, details, quantity, img }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg hover:bg-blue-100 transition">
      {/* Icon and Quantity */}
      <div className="flex flex-col items-center mb-3">
        <span className="text-4xl text-blue-600">{img}</span>
        <span className="mt-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
          {quantity} Jobs
        </span>
      </div>

      {/* Title */}
      <p className="text-lg font-bold text-gray-900 text-center">{title}</p>

      {/* Details */}
      <p className="text-sm text-gray-500 text-center">{details}</p>
    </div>
  );
}
