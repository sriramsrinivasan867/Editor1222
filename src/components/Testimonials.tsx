import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Artist",
      image: "https://i.pravatar.cc/100?img=1",
      quote:
        "This tool has saved me countless hours of work. The AI is incredibly accurate and the results are professional-grade.",
    },
    {
      name: "Michael Chen",
      role: "E-commerce Owner",
      image: "https://i.pravatar.cc/100?img=2",
      quote:
        "Perfect for my product photos. Fast, easy to use, and the bulk processing feature is a game-changer.",
    },
    {
      name: "Emily Rodriguez",
      role: "Social Media Manager",
      image: "https://i.pravatar.cc/100?img=3",
      quote:
        "The best free background remover I've found. Great results every time, and it's so simple to use.",
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied users who trust our background remover
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="testimonial-card">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};