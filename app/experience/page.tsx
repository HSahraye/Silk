import { redirect } from 'next/navigation';

/** /experience now lives at the root. Permanent redirect preserves any inbound link equity. */
export default function ExperienceRedirect() {
  redirect('/');
}
