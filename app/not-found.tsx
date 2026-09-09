import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center justify-center px-5 pt-24 text-center">
      <div className="flex max-w-md flex-col items-center gap-5">
        <p className="eyebrow">404</p>
        <h1 className="display-section">This page doesn’t exist.</h1>
        <p className="lead">
          The page you are looking for may have moved. Head back home, or get in
          touch and we will point you the right way.
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
