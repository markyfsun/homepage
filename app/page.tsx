import Image from 'next/image'
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard/ProductCard";

export default function Home() {
  return (
      <main>
        <h1>hello world</h1>
        <Link href="/users">Users</Link>
          <ProductCard></ProductCard>
          <div className='prose'>
              <h1>Garlic bread with cheese: What the science tells us</h1>
              <p>
                  For years parents have espoused the health benefits of eating garlic bread with cheese to their
                  children, with the food earning such an iconic status in our culture that kids will often dress
                  up as warm, cheesy loaf for Halloween.
              </p>
              <p>
                  But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
                  springing up around the country.
              </p>

          </div>
      </main>
  )
}
