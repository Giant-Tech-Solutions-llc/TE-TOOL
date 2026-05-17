import type { ClusterMeta } from './types'

/**
 * Cluster registry — the five semantic territories the guide hub owns.
 * Order here determines display order on /guide and in the cross-link grid.
 */
export const CLUSTERS: ClusterMeta[] = [
  {
    key: 'face-shapes',
    slug: 'face-shapes',
    label: 'Face Shapes',
    shortLabel: 'Faces',
    chapter: 'Chapter I — Face Architecture',
    pitch:
      'How facial geometry — width, height, jaw definition, hairline arc — determines which taper silhouettes flatter and which fight the structure.',
    intro:
      'A taper does not exist in isolation. It interacts with the architecture of the face it sits on — narrowing or widening visible width, lifting or pressing the crown, sharpening or softening the jaw. Five face structures cover roughly 92% of adult men, and each one has a clearly preferred taper range. This cluster maps the relationship.',
    accent: 'gold',
  },
  {
    key: 'taper-styles',
    slug: 'taper-styles',
    label: 'Taper Styles',
    shortLabel: 'Tapers',
    chapter: 'Chapter II — Taper Vocabulary',
    pitch:
      'The four taper heights, the geometry that distinguishes each, and the silhouette outcome each produces against typical face structures.',
    intro:
      'Taper height is the single most consequential variable in a modern men\'s cut. Where the contrast begins on the side determines how the cut reads on the head — conservative, sharp, athletic, or editorial. This cluster defines each taper height in barber-precise language and shows the silhouette logic behind it.',
    accent: 'cream',
  },
  {
    key: 'hair-textures',
    slug: 'hair-textures',
    label: 'Hair Textures',
    shortLabel: 'Textures',
    chapter: 'Chapter III — Texture Engineering',
    pitch:
      'How straight, wavy, curly, and coily textures respond to different taper geometries — and which combinations create silhouette failure.',
    intro:
      'Hair behaves like material. Straight hair telegraphs angular cuts. Curly hair compresses height vertically and expands width. A taper that flatters one texture can fail catastrophically on another. This cluster pairs each texture class with the taper geometry that respects its natural growth pattern.',
    accent: 'graphite',
  },
  {
    key: 'maintenance',
    slug: 'maintenance',
    label: 'Maintenance',
    shortLabel: 'Maintenance',
    chapter: 'Chapter IV — Maintenance Systems',
    pitch:
      'Visit cadence, edge-up rhythm, regrowth handling, and the styling routines that protect a taper between barber chairs.',
    intro:
      'A taper is not finished at the chair. It is finished by the maintenance system that follows it home. Edge-up cadence, product selection, drying technique, and growth-out handling all decide whether week three still looks intentional or merely tired. This cluster details the maintenance contract a taper actually requires.',
    accent: 'gold',
  },
  {
    key: 'barber-communication',
    slug: 'barber-communication',
    label: 'Barber Communication',
    shortLabel: 'Barber',
    chapter: 'Chapter V — Barber Communication',
    pitch:
      'The exact vocabulary, guard numbers, and reference language that translate a recommendation into a barber-ready brief.',
    intro:
      'Most cut failures are translation failures. The wrong words at the chair turn a precise recommendation into a generic interpretation. This cluster gives the barber-side vocabulary — guard progressions, blend-height language, neckline directions — needed to specify a cut without ambiguity.',
    accent: 'cream',
  },
]

export const CLUSTER_MAP = Object.fromEntries(
  CLUSTERS.map((c) => [c.key, c]),
) as Record<ClusterMeta['key'], ClusterMeta>

export function getCluster(key: ClusterMeta['key']): ClusterMeta {
  return CLUSTER_MAP[key]
}
