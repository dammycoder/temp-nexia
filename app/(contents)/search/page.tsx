import { Suspense } from 'react';
import SearchPageContent from './SearchPageContent';
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <SearchPageContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
