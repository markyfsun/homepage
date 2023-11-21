import Link from "next/link";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import ParallaxImage from "@/app/components/ParallaxImage/ParallaxImage";

export default function Home() {
  return (
      <main>
        <h1>Furry Visions, AI Missions</h1>
          <h1>梦绘福瑞，智绘未来</h1>
        <Link href="/users">Users</Link>
          <ProductCard></ProductCard>
          <div style={{position: 'relative', }}>
              <ParallaxImage src="/images/bg.jpeg" speed={30} style={{
                  position: 'absolute',
                  top: 0,
                  zIndex: 0 // Higher index on top
              }}/>
              <ParallaxImage src="/images/cr.PNG" speed={0} style={{
                  position: 'absolute',
                  top: 0,
                  zIndex: 1 // Lower index below
              }}/>
              </div>
              {/* Add more content here if needed */}
          {/*<div style={{position: 'relative', overflow: 'hidden', height: '100vh'}}>*/}
          {/*    <ParallaxImage src="/images/IMG_0689.PNG" speed={0} style={{*/}
          {/*        position: 'absolute',*/}
          {/*        top: 0,*/}
          {/*        zIndex: 0 // Higher index on top*/}
          {/*    }}/>*/}
          {/*    <ParallaxImage src="/images/cloud.png" speed={-20} style={{*/}
          {/*        position: 'absolute',*/}
          {/*        top: 0,*/}
          {/*        zIndex: 1 // Lower index below*/}
          {/*    }}/>*/}
          {/*    /!* Add more content here if needed *!/*/}
          {/*</div>*/}
      </main>
  )
}
