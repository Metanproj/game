import Image from "next/image";
// Update import statement in your page component
import SignUpForm from '../components/SignUpForm.client';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      <SignUpForm /> {/* Include the SignUpForm component */}
    </div>
  );
}
