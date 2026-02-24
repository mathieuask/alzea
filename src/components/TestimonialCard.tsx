import StarRating from './StarRating';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  initials: string;
  image?: string;
}

export default function TestimonialCard({ quote, author, role, rating, initials, image }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <StarRating rating={rating} />
      <p className="text-gray-600 italic mt-4 mb-6 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        {image ? (
          <img src={image} alt={author} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#D13D6A]/10 text-[#D13D6A] font-bold text-sm flex items-center justify-center">
            {initials}
          </div>
        )}
        <div>
          <div className="font-semibold text-[#32373c] text-sm">{author}</div>
          <div className="text-gray-400 text-xs">{role}</div>
        </div>
      </div>
    </div>
  );
}
