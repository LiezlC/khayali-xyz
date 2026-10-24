// Static build evidence, independent of runtime git availability.
export const dynamic = 'force-static'

export function GET() {
  return Response.json({ revision: process.env.KHAYALI_BUILD_REVISION })
}
