import Image from "next/image";

interface Props {
  title: string;
  subtitle: string;
  image: string;
}

export default function PageHeader({
  title,
  subtitle,
  image,
}: Props) {
  return (
    <section className="relative h-[350px]">

      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">

        <div className="text-center text-white">

          <h1 className="text-5xl font-bold">
            {title}
          </h1>

          <p className="mt-5 text-xl">
            {subtitle}
          </p>

        </div>

      </div>

    </section>
  );
}