import { Button } from '@/components/ui/button';

export function GoogleButton() {
  return (
    <Button 
      variant="gradient" 
      className="w-full flex items-center justify-center gap-2"
    >
      <img src="/svg/google.svg" alt="" className="w-5 h-5" />
      Continue with Google
    </Button>
  );
}