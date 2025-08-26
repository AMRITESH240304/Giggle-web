import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Job Not Found</h2>
        <p className="text-gray-300 mb-8">
          Sorry, the job you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/dashboard">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
