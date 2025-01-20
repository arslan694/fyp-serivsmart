import Image from "next/image";
import heroImage from "../public/images/services-hero-bg.png"; // Example hero image path
import service1 from "../public/images/service1.png"; // Example service card images
import service2 from "../public/images/service2.png";
import service3 from "../public/images/service3.png";
import service4 from "../public/images/service4.png";
import service5 from "../public/images/service5.png";
import service6 from "../public/images/service6.png";

const Services = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="h-[500px] w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage.src})`,
        }}
      >
        
      </section>


      {/* Services Cards Section */}
      <section className="px-6 py-10 md:px-20">
      <h1 className=" text-4xl font-bold text-orange-500 mb-3">Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Card 1 */}
          <div className="border rounded-lg shadow-md bg-white">
            <Image
              src={service1}
              alt="Full Service Wash"
              className="rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-[#173049] text-lg font-bold">
                Full Service Wash
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                There are not many of passages of Lorem Ipsum avail in alteration donationa in form.
              </p>
              <button className="mt-4 text-[#173049] bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
                →
              </button>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="border rounded-lg shadow-md bg-white">
            <Image
              src={service2}
              alt="Auto Detailing"
              className="rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-[#173049] text-lg font-bold">Auto Detailing</h3>
              <p className="text-gray-500 text-sm mt-2">
                There are not many of passages of Lorem Ipsum avail in alteration donationa in form.
              </p>
              <button className="mt-4 text-[#173049] bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
                →
              </button>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="border rounded-lg shadow-md bg-white">
            <Image
              src={service3}
              alt="Express Interior"
              className="rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-[#173049] text-lg font-bold">
                Express Interior
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                There are not many of passages of Lorem Ipsum avail in alteration donationa in form.
              </p>
              <button className="mt-4 text-[#173049] bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
                →
              </button>
            </div>
          </div>

          {/* Service Card 4 */}
          <div className="border rounded-lg shadow-md bg-white">
            <Image
              src={service4}
              alt="Interior Polish"
              className="rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-[#173049] text-lg font-bold">
                Interior Polish
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                There are not many of passages of Lorem Ipsum avail in alteration donationa in form.
              </p>
              <button className="mt-4 text-[#173049] bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
                →
              </button>
            </div>
          </div>

          {/* Service Card 5 */}
          <div className="border rounded-lg shadow-md bg-white">
            <Image
              src={service5}
              alt="Tire Shine"
              className="rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-[#173049] text-lg font-bold">Tire Shine</h3>
              <p className="text-gray-500 text-sm mt-2">
                There are not many of passages of Lorem Ipsum avail in alteration donationa in form.
              </p>
              <button className="mt-4 text-[#173049] bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
                →
              </button>
            </div>
          </div>

          {/* Service Card 6 */}
          <div className="border rounded-lg shadow-md bg-white">
            <Image
              src={service6}
              alt="Engine Wash"
              className="rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-[#173049] text-lg font-bold">Engine Wash</h3>
              <p className="text-gray-500 text-sm mt-2">
                There are not many of passages of Lorem Ipsum avail in alteration donationa in form.
              </p>
              <button className="mt-4 text-[#173049] bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
            Load More
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
