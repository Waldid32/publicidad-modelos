import { Suspense } from 'react';
import ResetPassword from '@/components/ResetPassword';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPassword />
    </Suspense>
  );
}
