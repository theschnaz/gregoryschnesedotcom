import { jsonResume } from '@/lib/json-resume';

export function GET() {
  return new Response(JSON.stringify(jsonResume(), null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
