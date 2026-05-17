import { Cinematic } from '@/components/shared'

/**
 * Suspense fallback for all /guide/* routes. Mirrors the article shell
 * skeleton so the user sees structural continuity during transitions
 * instead of a content-flash.
 */
export default function GuideLoading() {
  return (
    <section className="relative bg-ink text-soft border-t border-line grain-soft">
      <Cinematic className="pt-32 lg:pt-40 pb-28">
        {/* Breadcrumb shimmer */}
        <div className="flex items-center gap-3 mb-12">
          <Shimmer w="w-12" h="h-3" />
          <Shimmer w="w-1" h="h-3" />
          <Shimmer w="w-14" h="h-3" />
        </div>

        {/* Headline shimmer */}
        <div className="space-y-4 mb-14 lg:mb-20 max-w-3xl">
          <Shimmer w="w-32" h="h-3" />
          <Shimmer w="w-full" h="h-16 lg:h-20" />
          <Shimmer w="w-4/5" h="h-16 lg:h-20" />
          <Shimmer w="w-full" h="h-6 mt-6" />
          <Shimmer w="w-11/12" h="h-6" />
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12">
          <aside className="hidden lg:block lg:col-span-3 space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <Shimmer key={i} w="w-full" h="h-4" />
            ))}
          </aside>
          <div className="col-span-12 lg:col-span-9 max-w-[720px] space-y-8">
            <Shimmer w="w-full" h="h-48" />
            <Shimmer w="w-full" h="h-4" />
            <Shimmer w="w-11/12" h="h-4" />
            <Shimmer w="w-10/12" h="h-4" />
            <Shimmer w="w-full" h="h-4" />
          </div>
        </div>
      </Cinematic>
    </section>
  )
}

function Shimmer({ w, h }: { w: string; h: string }) {
  return (
    <div
      className={`${w} ${h} rounded-md bg-[linear-gradient(110deg,rgba(255,255,255,0.04)_8%,rgba(255,255,255,0.08)_18%,rgba(255,255,255,0.04)_33%)] bg-[length:200%_100%] animate-shimmer`}
    />
  )
}
