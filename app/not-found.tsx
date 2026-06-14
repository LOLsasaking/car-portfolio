import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">Lost in the Garage</p>
      <h1 className="heading-xl mt-6 text-bone">404</h1>
      <p className="mt-6 max-w-md text-sm text-bone/50">
        The page you are looking for is not part of the collection.
      </p>
      <Link href="/" className="gold-button mt-10">
        Return Home
      </Link>
    </div>
  );
}
