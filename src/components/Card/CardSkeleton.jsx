export default function CardSkelenton() {
  return [1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
    <div key={i} className="flex flex-col gap-2">
      <div className="skeleton h-28 md:h-48 w-full"></div>
      <div className="skeleton h-2 md:h-4 w-28"></div>
      <div className="skeleton h-3 md:h-5 w-full"></div>
    </div>
  ));
}
